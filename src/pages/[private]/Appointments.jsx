import { useNavigate } from "react-router-dom";
import { useAppointments } from "../../hooks/use-appointments";

import { routes } from "../../utils/general";

import { CommonMainContainer } from "../../styles/common";

import { Button } from "@mui/material";

import CustomHeader from "../../components/customHeader/CustomHeader";
import EmptyList from "../../components/emptyList/EmptyList";
import AppointmentCard from "../../components/appointmentCard/AppointmentCard";

export default function Appointments() {
  const navigate = useNavigate();

  const { data: appointmentsList } = useAppointments();

  const hasAppointments = appointmentsList.length > 0;

  const customHeaderData = {
    title: "Agendamentos",
    description: "Gerencie seus agendamentos de forma eficiente e organizada.",
  };

  function renderAppointments(item, index) {
    return <AppointmentCard key={index} {...item} />;
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
