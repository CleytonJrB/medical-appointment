import { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { useMyAppointments } from "../../hooks/use-my-appointments";
import { updateAppointment } from "../../db/appointments.db";

import {
  formattedAppointmentData,
  isCustomDaysBefore,
} from "../../utils/appointments";

import { CommonMainContainer } from "../../styles/common";
import { customColors } from "../../styles/colors";

import CustomHeader from "../../components/customHeader/CustomHeader";
import EmptyList from "../../components/emptyList/EmptyList";
import AppointmentCard from "../../components/appointmentCard/AppointmentCard";
import CustomDialogToConfirmedAppointment from "../../components/dialogs/CustomDialogCreateCampaignType";
import CustomDialog from "../../components/customDialog/CustomDialog";
import DeleteDialog from "../../components/dialogs/DeleteDialog";

import FreeCancellationRoundedIcon from "@mui/icons-material/FreeCancellationRounded";
import PublishedWithChangesRoundedIcon from "@mui/icons-material/PublishedWithChangesRounded";
import RecommendOutlinedIcon from "@mui/icons-material/RecommendOutlined";

export default function MedicalAppointments() {
  const { data: appointmentsList, refetch: refetchAppointmentsList } =
    useMyAppointments();

  const [openConfirmedAppointment, setOpenConfirmedAppointment] = useState({
    open: false,
    appointment: null,
  });
  const [openDeleteDialog, setOpenDeleteDialog] = useState({
    open: false,
    appointment: null,
  });

  const hasAppointments = appointmentsList.length > 0;

  const customHeaderData = {
    title: "Minhas Consultas",
    description:
      "Gerencie suas consultas, aceite, cancele ou visualize detalhes.",
  };

  const confirmDeleteTitle = `Tem certeza que deseja cancelar a consulta do paciente ${
    openDeleteDialog?.appointment?.patientName ?? "Paciente desconhecido"
  }?`;

  const cancelAppointmentMutate = useMutation({
    mutationFn: async (ap) => {
      const id = ap?.id;

      const updatedAppointment = {
        ...ap,
        doctor: ap?.doctor?.id || null,
        status: "cancelled",
      };

      await updateAppointment(id, formattedAppointmentData(updatedAppointment));
    },
    onSuccess: () => {
      refetchAppointmentsList();
    },
    onError: (error) => {
      console.error("cancelAppointmentMutate - error: ", error);
    },
  });

  const customMenus = (appointment) => {
    const isConfirmed = appointment?.status === "confirmed";
    const isCancelled = appointment?.status === "cancelled";
    const isCompleted = appointment?.status === "completed";

    const condition = isCancelled || isConfirmed || isCompleted;
    const isBefore = isCustomDaysBefore({
      days: 2,
      targetDate: new Date(appointment?.appointmentDate),
    });

    return [
      {
        title: "Confimar agendamento",
        handle: () => handleOpenCloseDialogConfirmedAppointment(appointment),
        icon: () => (
          <RecommendOutlinedIcon sx={{ color: customColors.green }} />
        ),
        color: customColors.green,
        disabled: condition,
      },
      {
        title: "Cancelar agendamento",
        handle: () => handleOpenCloseDeleteDialog(appointment),
        icon: () => (
          <FreeCancellationRoundedIcon sx={{ color: customColors.red }} />
        ),
        color: customColors.red,
      },
      {
        title: "Alterar Sala de Atendimento",
        handle: () => handleOpenCloseDialogConfirmedAppointment(appointment),
        icon: () => <PublishedWithChangesRoundedIcon />,
        disabled: !isConfirmed || isBefore,
      },
    ];
  };

  function handleOpenCloseDeleteDialog(appointment) {
    setOpenDeleteDialog((state) => {
      return {
        open: !state.open,
        appointment: appointment ?? null,
      };
    });
  }

  function handleOpenCloseDialogConfirmedAppointment(appointment) {
    setOpenConfirmedAppointment((state) => {
      return {
        open: !state.open,
        appointment: appointment ?? null,
      };
    });
  }

  function renderAppointments(item, index) {
    const isConfirmed = item?.status === "confirmed";
    const isCancelled = item?.status === "cancelled";
    const isCompleted = item?.status === "completed";

    const condition =
      (isCancelled || isConfirmed || isCompleted) &&
      isCustomDaysBefore({
        days: 2,
        targetDate: new Date(item?.appointmentDate),
      });

    return (
      <AppointmentCard
        key={index}
        customMenus={customMenus(item)}
        disabledThreeDots={condition}
        userTypeIsDoctor
        {...item}
      />
    );
  }

  return (
    <CommonMainContainer gap={"1rem"}>
      <CustomHeader {...customHeaderData} />

      <CustomDialog
        open={openConfirmedAppointment?.open}
        handleCloseDialog={() =>
          handleOpenCloseDialogConfirmedAppointment(null)
        }
      >
        <CustomDialogToConfirmedAppointment
          handleOpenCloseDialogConfirmedAppointment={() =>
            handleOpenCloseDialogConfirmedAppointment(null)
          }
          appointment={openConfirmedAppointment?.appointment}
          refetchAppointmentsList={refetchAppointmentsList}
        />
      </CustomDialog>

      <CustomDialog
        open={openDeleteDialog?.open}
        handleCloseDialog={() => handleOpenCloseDeleteDialog(null)}
      >
        <DeleteDialog
          handleCloseOpenDialogDelete={() => handleOpenCloseDeleteDialog(null)}
          mutate={async () =>
            await cancelAppointmentMutate.mutateAsync(
              openDeleteDialog?.appointment
            )
          }
          confirmDeleteMessage={confirmDeleteTitle}
          confirmDeleteTitle={"Cancelar Consulta"}
          cancelDeleteButtonTitle="Confirmar Cancelamento"
          confirmDeleteDescription={null}
          hasConfirmation
        />
      </CustomDialog>

      {hasAppointments ? (
        appointmentsList.map(renderAppointments)
      ) : (
        <EmptyList />
      )}
    </CommonMainContainer>
  );
}
