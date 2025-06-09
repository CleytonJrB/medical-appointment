import { CommonMainContainer } from "../../styles/common";

import { BarChart } from "@mui/x-charts/BarChart";

import CustomHeader from "../../components/customHeader/CustomHeader";
import { Stack } from "@mui/material";

export default function Reports() {
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
          series={[{ data: [35, 44, 24, 34] }]}
          height={290}
          xAxis={[
            { data: ["Agendamentos", "Cancelamentos", "Disponibilidade"] },
          ]}
        />
      </Stack>
    </CommonMainContainer>
  );
}
