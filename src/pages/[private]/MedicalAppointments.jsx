import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useAppointments } from "../../hooks/use-appointments";

import { routes } from "../../utils/general";

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
  const navigate = useNavigate();

  const { data: appointmentsList } = useAppointments();

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

  const confirmDeleteTitle = `Tem certeza que deseja cancelar a consulta do paciente ${openDeleteDialog?.appointment?.patientName}?`;

  const customMenus = (appointment) => {
    return [
      {
        title: "Confimar agendamento",
        handle: () => handleOpenCloseDialogConfirmedAppointment(appointment),
        icon: () => (
          <RecommendOutlinedIcon sx={{ color: customColors.green }} />
        ),
        color: customColors.green,
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
        title: "Alterar agendamento",
        handle: () =>
          navigate(routes.protected.appointmentsCreate, { state: appointment }),
        icon: () => <PublishedWithChangesRoundedIcon />,
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
    return (
      <AppointmentCard
        key={index}
        customMenus={customMenus(item)}
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
        />
      </CustomDialog>

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
