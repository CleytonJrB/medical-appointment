import { useNavigate } from "react-router-dom";
import { useAppointments } from "../../hooks/use-appointments";

import { routes } from "../../utils/general";

import { customColors } from "../../styles/colors";
import { CommonMainContainer } from "../../styles/common";

import { Button } from "@mui/material";

import CustomHeader from "../../components/customHeader/CustomHeader";
import EmptyList from "../../components/emptyList/EmptyList";
import AppointmentCard from "../../components/appointmentCard/AppointmentCard";

import FreeCancellationRoundedIcon from "@mui/icons-material/FreeCancellationRounded";
import PublishedWithChangesRoundedIcon from "@mui/icons-material/PublishedWithChangesRounded";

export default function Appointments() {
  const navigate = useNavigate();

  const { data: appointmentsList } = useAppointments();

  const hasAppointments = appointmentsList.length > 0;

  const customHeaderData = {
    title: "Agendamentos",
    description: "Gerencie seus agendamentos de forma eficiente e organizada.",
  };

  const customMenus = (appointment) => {
    return [
      {
        title: "Cancelar agendamento",
        handle: () => () => {},
        icon: () => (
          <FreeCancellationRoundedIcon sx={{ color: customColors.red }} />
        ),
        color: customColors.red,
      },
      {
        title: "Reagendar",
        handle: () =>
          navigate(routes.protected.appointmentsCreate, { state: appointment }),
        icon: () => <PublishedWithChangesRoundedIcon />,
      },
    ];
  };

  function renderAppointments(item, index) {
    return (
      <AppointmentCard key={index} customMenus={customMenus(item)} {...item} />
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

      {hasAppointments ? (
        appointmentsList.map(renderAppointments)
      ) : (
        <EmptyList />
      )}
    </CommonMainContainer>
  );
}
