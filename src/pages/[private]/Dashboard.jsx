import { useServiceRooms } from "../../hooks/use-service-rooms";
import { useMyAppointments } from "../../hooks/use-my-appointments";

import { CommonMainContainer } from "../../styles/common";

import { Stack, Typography } from "@mui/material";

import CustomHeader from "../../components/customHeader/CustomHeader";
import CustomDateSelected from "../../components/customDateSelected/CustomDateSelected";
import CustomIcon from "../../components/customIcon/CustomIcon";

export default function Dashboard() {
  const { data: myAppointmentsList } = useMyAppointments();
  const { data: serviceRoomsList } = useServiceRooms();

  const date = new Date();

  const totalAppointments = myAppointmentsList?.length || 0;
  const totalServiceRooms =
    serviceRoomsList?.filter((serviceRooms) => serviceRooms.status === "active")
      ?.length || 0;

  const todayAppointments =
    myAppointmentsList?.filter((appointment) => {
      return (
        new Date(appointment.createdAt).toDateString() == date.toDateString()
      );
    }).length || 0;

  const availableRoomsToday =
    myAppointmentsList?.filter((appointment) => {
      return (
        new Date(appointment.date).toDateString() == date.toDateString() &&
        appointment.status === "confirmed"
      );
    }).length || 0;

  const customHeaderData = {
    title: "Home",
    description:
      "Bem-vindo ao seu painel de controle, aqui você pode ver os status dos agendamentos e calendários.",
  };

  const statusDataList = [
    {
      title: "Total de Agendamentos",
      value: totalAppointments,
      icon: "turned",
    },
    {
      title: "Agendados hoje",
      value: todayAppointments,
      icon: "eventNote",
    },
    {
      title: "Salas disponíveis hoje",
      value: totalServiceRooms - availableRoomsToday,
      icon: "chair",
    },
  ];

  function renderStatusData(item, index) {
    const { title, value, icon } = item;

    return (
      <Stack
        key={index}
        direction={"row"}
        alignItems={"center"}
        gap={"1rem"}
        border={"1px solid #e0e0e0"}
        padding={"1rem"}
        borderRadius={"8px"}
      >
        <Stack direction={"column"} alignItems={"baseline"} gap={"0.5rem"}>
          <Typography variant="body2" fontWeight={600}>
            {title}
          </Typography>

          <Typography variant="body1" fontWeight={500}>
            {value}
          </Typography>
        </Stack>

        <Stack
          bgcolor={"#f0f0f0"}
          width={"3.5rem"}
          height={"4rem"}
          borderRadius={"8px"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <CustomIcon icon={icon} />
        </Stack>
      </Stack>
    );
  }

  return (
    <CommonMainContainer gap={"1rem"}>
      <CustomHeader {...customHeaderData} />

      <Stack
        flexWrap={"wrap"}
        direction={"row"}
        gap={"1rem"}
        width={"100%"}
        justifyContent={"space-between"}
      >
        {statusDataList.map((item, index) => renderStatusData(item, index))}
      </Stack>

      <CustomDateSelected
        initialDate={date}
        appointments={myAppointmentsList}
      />
    </CommonMainContainer>
  );
}
