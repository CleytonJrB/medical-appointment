import { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { useServiceRooms } from "../../hooks/use-service-rooms";
import { useAppointments } from "../../hooks/use-appointments";

import { updateAppointment } from "../../db/appointments.db";

import { isSameDay } from "date-fns";

import * as Yup from "yup";

import { formattedAppointmentData } from "../../utils/appointments";
import { extractYupErrors } from "../../utils/general";

import { customColors } from "../../styles/colors";

import { Button, IconButton, Stack, Typography } from "@mui/material";

import CustomSelected from "../customSelected/CustomSelected";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const confirmSchema = Yup.object().shape({
  serviceRoomSelected: Yup.string().required("Campo obrigatorio!"),
});

export default function CustomDialogConfirmAppointment({
  handleOpenCloseDialogConfirmedAppointment,
  appointment,
  refetchAppointmentsList,
}) {
  const { data: allAppointments } = useAppointments();
  const { data: serviceRoomsList } = useServiceRooms();

  const _allAppointmentsWithServiceRoomId = allAppointments
    ?.filter((ap) => {
      const _appointmentDate = appointment?.appointmentDate ?? new Date();

      const condition = isSameDay(
        _appointmentDate,
        new Date(ap?.appointmentDate)
      );

      const isCancelled = ap.status === "cancelled";
      const isCompleted = ap.status === "completed";

      return (
        condition &&
        !isCancelled &&
        !isCompleted &&
        ap?.id !== appointment?.id &&
        ap.serviceRoomId
      );
    })
    .map((ap) => ap.serviceRoomId);

  const patientName = appointment?.patientName ?? "";
  const appointmentDate = appointment?.appointmentDate ?? new Date();

  const hasServiceRooms = appointment?.serviceRoom;

  const [serviceRoomSelected, setServiceRoomSelected] = useState(
    hasServiceRooms ? appointment?.serviceRoom?.id : ""
  );
  const [formErrors, setFormErrors] = useState({});

  function formattedSelectedLit() {
    return serviceRoomsList
      ?.filter(
        (item) =>
          !_allAppointmentsWithServiceRoomId?.includes(item?.id) &&
          item?.status === "active"
      )
      ?.map((item) => {
        return {
          id: item?.id,
          label: item?.name,
        };
      });
  }

  const confirmAppointmentMutate = useMutation({
    mutationFn: async () => {
      await customHandle({
        serviceRoomSelected,
      });

      const id = appointment?.id;

      const updatedAppointment = {
        ...appointment,
        doctor: appointment?.doctor?.id || null,
        serviceRoomId: serviceRoomSelected,
        status: "confirmed",
      };

      await updateAppointment(id, formattedAppointmentData(updatedAppointment));
    },
    onSuccess: () => {
      refetchAppointmentsList();

      handleOpenCloseDialogConfirmedAppointment();
    },
    onError: (error) => {
      console.error("cancelAppointmentMutate - error: ", error);
    },
  });

  async function customHandle(values) {
    try {
      await confirmSchema.validate(values, {
        abortEarly: false,
      });

      setFormErrors({});
    } catch (error) {
      setFormErrors(extractYupErrors(error));
      throw error;
    }
  }

  return (
    <Stack gap="1rem" flexDirection="column" padding="1rem" alignItems="center">
      <Stack
        width="100%"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        gap="1rem"
      >
        <Typography variant="h5" fontWeight={700}>
          {hasServiceRooms ? "Editar Consulta" : "Confirmar Consulta"}
        </Typography>

        <IconButton onClick={handleOpenCloseDialogConfirmedAppointment}>
          <CloseRoundedIcon sx={{ color: customColors.black }} />
        </IconButton>
      </Stack>

      <Typography variant="body1">
        Você está prestes a confirmar a consulta com o paciente{" "}
        <strong>{patientName}</strong> para o dia{" "}
        <strong>{new Date(appointmentDate).toLocaleDateString()}</strong> às{" "}
        <strong>
          {new Date(appointmentDate).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </strong>
        .
      </Typography>

      <Typography variant="body1">
        Esta ação não poderá ser desfeita. Após confirmar, o paciente será
        notificado.
      </Typography>

      <Typography variant="body1">
        Escola qual sala de atendimento será utilizada para esta consulta.
      </Typography>

      <CustomSelected
        label="Sala de Atendimento"
        list={formattedSelectedLit()}
        value={serviceRoomSelected}
        error={formErrors?.serviceRoomSelected}
        onChange={(e) => {
          setServiceRoomSelected(e);

          setFormErrors((prev) => ({
            ...prev,
            serviceRoomSelected: "",
          }));
        }}
      />

      <Stack direction={"row"} gap="1rem" mt="1rem" width="100%">
        <Button
          variant="text"
          fullWidth
          onClick={handleOpenCloseDialogConfirmedAppointment}
        >
          Cancelar
        </Button>

        <Button
          variant="contained"
          disabled={false}
          loading={false}
          fullWidth
          onClick={async () => {
            await confirmAppointmentMutate.mutateAsync();
          }}
        >
          Confirmar Consulta
        </Button>
      </Stack>
    </Stack>
  );
}
