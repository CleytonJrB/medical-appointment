import { useAppointments } from "../../hooks/use-appointments";
import { useServiceRooms } from "../../hooks/use-service-rooms";

import { CommonMainContainer } from "../../styles/common";

import AppointmentCard from "../../components/appointmentCard/AppointmentCard";
import CustomHeader from "../../components/customHeader/CustomHeader";
import EmptyList from "../../components/emptyList/EmptyList";

export default function AllAppointments() {
  const { data: appointmentsList } = useAppointments();
  const { data: serviceRoomsList } = useServiceRooms();

  const _appointmentsList = (appointmentsList ?? []).map((appointment) => {
    const serviceRoom = (serviceRoomsList ?? []).find(
      (room) => room.id === appointment.serviceRoomId
    );

    return {
      ...appointment,
      serviceRoom: serviceRoom ? serviceRoom : appointment.serviceRoom,
    };
  });

  const hasAppointments = _appointmentsList?.length > 0;

  const customHeaderData = {
    title: "Todos os Agendamentos",
    description: "Todos os agendamentos realizados na plataforma.",
  };

  function renderAppointments(item, index) {
    return <AppointmentCard key={index} {...item} />;
  }

  return (
    <CommonMainContainer gap={"1rem"}>
      <CustomHeader {...customHeaderData} />

      {hasAppointments ? (
        _appointmentsList.map(renderAppointments)
      ) : (
        <EmptyList />
      )}
    </CommonMainContainer>
  );
}
