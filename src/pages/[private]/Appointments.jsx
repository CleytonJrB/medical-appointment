import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useMyAppointments } from "../../hooks/use-my-appointments";

import { routes } from "../../utils/general";

import { customColors } from "../../styles/colors";
import { CommonMainContainer } from "../../styles/common";

import { Button } from "@mui/material";

import CustomHeader from "../../components/customHeader/CustomHeader";
import EmptyList from "../../components/emptyList/EmptyList";
import AppointmentCard from "../../components/appointmentCard/AppointmentCard";
import CustomDialog from "../../components/customDialog/CustomDialog";

import FreeCancellationRoundedIcon from "@mui/icons-material/FreeCancellationRounded";
import PublishedWithChangesRoundedIcon from "@mui/icons-material/PublishedWithChangesRounded";
import DeleteDialog from "../../components/dialogs/DeleteDialog";
import { isCustomDaysBefore } from "../../utils/appointments";

export default function Appointments() {
  const navigate = useNavigate();

  const { data: appointmentsList } = useMyAppointments();

  const [openDeleteDialog, setOpenDeleteDialog] = useState({
    open: false,
    appointment: null,
  });

  const hasAppointments = appointmentsList.length > 0;

  const customHeaderData = {
    title: "Agendamentos",
    description: "Gerencie seus agendamentos de forma eficiente e organizada.",
  };

  const confirmDeleteTitle = `Tem certeza que deseja cancelar a consulta com o doutor ${
    openDeleteDialog?.appointment?.doctor?.name ?? "Doutor(a) desconhecido"
  }?`;

  const customMenus = (appointment) => {
    return [
      {
        title: "Cancelar agendamento",
        handle: () => handleOpenCloseDeleteDialog(appointment),
        icon: () => (
          <FreeCancellationRoundedIcon sx={{ color: customColors.red }} />
        ),
        color: customColors.red,
        disabled: isCustomDaysBefore({
          days: 2,
          targetDate: new Date(appointment?.appointmentDate),
        }),
      },
      {
        title: "Reagendar",
        handle: () =>
          navigate(routes.protected.appointmentsCreate, { state: appointment }),
        icon: () => <PublishedWithChangesRoundedIcon />,
        disabled: isCustomDaysBefore({
          days: 1,
          targetDate: new Date(appointment?.appointmentDate),
        }),
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

  function renderAppointments(item, index) {
    const isConfirmed = item?.status === "confirmed";
    const isCancelled = item?.status === "cancelled";
    const isCompleted = item?.status === "completed";

    const condition = isCancelled || isConfirmed || isCompleted;

    return (
      <AppointmentCard
        key={index}
        disabledThreeDots={condition}
        customMenus={customMenus(item)}
        {...item}
      />
    );
  }

  return (
    <CommonMainContainer gap={"1rem"}>
      <CustomHeader {...customHeaderData}>
        {hasAppointments && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(routes.protected.appointmentsCreate)}
          >
            Criar novo agendamento
          </Button>
        )}
      </CustomHeader>

      <CustomDialog
        open={openDeleteDialog.open}
        handleCloseDialog={() => handleOpenCloseDeleteDialog(null)}
      >
        <DeleteDialog
          handleCloseOpenDialogDelete={() => handleOpenCloseDeleteDialog(null)}
          mutate={async () => {}}
          confirmDeleteMessage={confirmDeleteTitle}
          cancelDeleteButtonTitle="Cancelar Consulta"
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
