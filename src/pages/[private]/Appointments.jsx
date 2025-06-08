import { useAppointments } from "../../hooks/use-appointments";

import { CommonMainContainer } from "../../styles/common";

import CustomHeader from "../../components/customHeader/CustomHeader";
import EmptyList from "../../components/emptyList/EmptyList";

export default function Appointments() {
  const { data: appointmentsList } = useAppointments();

  const hasAppointments = appointmentsList.length > 0;

  const customHeaderData = {
    title: "Agendamentos",
    description: "Gerencie seus agendamentos de forma eficiente e organizada.",
  };

  function renderAppointments() {
    return (
      <div>
        {/* Aqui você pode adicionar a lógica para renderizar os agendamentos */}
        <p>Lista de agendamentos será exibida aqui.</p>
      </div>
    );
  }

  return (
    <CommonMainContainer>
      <CustomHeader {...customHeaderData} />

      {hasAppointments ? (
        appointmentsList.map(renderAppointments)
      ) : (
        <EmptyList />
      )}
    </CommonMainContainer>
  );
}
