import { useAppointments } from "../../hooks/use-appointments";

import { CommonMainContainer } from "../../styles/common";

import { BarChart } from "@mui/x-charts/BarChart";
import { Stack } from "@mui/material";

import CustomHeader from "../../components/customHeader/CustomHeader";

export default function Reports() {
  const { data: appointmentsList } = useAppointments();

  const totalAppointments = appointmentsList?.length ?? 0;
  const totalCancelled = appointmentsList?.filter(
    (appointment) => appointment.status === "cancelled"
  ).length;
  const totalConfirmed = appointmentsList?.filter(
    (appointment) => appointment.status === "confirmed"
  ).length;

  const customHeaderData = {
    title: "Relatórios",
    description:
      "Relatórios de agendamentos, cancelamentos e disponibilidade de horários.",
  };

  return (
    <CommonMainContainer gap={"1rem"}>
      <CustomHeader {...customHeaderData} />
      <Stack width="100%" height="100%" gap={"1rem"}>
        <BarChart
          series={[
            { data: [totalAppointments, totalCancelled, totalConfirmed] },
          ]}
          height={290}
          xAxis={[
            { data: ["Agendamentos", "Cancelamentos", "Disponibilidade"] },
          ]}
        />
      </Stack>
    </CommonMainContainer>
  );
}
