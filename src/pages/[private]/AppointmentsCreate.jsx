import { CommonMainContainer } from "../../styles/common";

import { Typography } from "@mui/material";

import CustomStepper from "../../components/customStepper/CustomStepper";
import CustomHeader from "../../components/customHeader/CustomHeader";

import AppointCreateOne from "../../components/appointmentsCreateSteps/appointCreateOne";
import AppointCreateTwo from "../../components/appointmentsCreateSteps/AppointCreateTwo";

export default function AppointmentsCreate() {
  const customHeaderData = {
    title: "Criação de Agendamento",
    hasBack: true,
  };

  const customSteps = [
    {
      label: "Escolha da Data",
      content: () => <AppointCreateOne />,
    },
    {
      label: "Escolha o Médico e a Especialidade",
      content: () => <AppointCreateTwo />,
    },
    {
      label: "Dados do Paciente",
      content: () => <AppointCreateTwo />,
    },
    {
      label: "Dados do Agendamento",
      content: () => (
        <>
          <Typography> Content for Appointment Data Step </Typography>
        </>
      ),
    },
    {
      label: "Confirmação",
      content: () => (
        <>
          <Typography> Content for Confirmation Step </Typography>
        </>
      ),
    },
  ];

  return (
    <CommonMainContainer sx={{ gap: "1rem" }}>
      <CustomHeader {...customHeaderData} />

      <CustomStepper steps={customSteps} />
    </CommonMainContainer>
  );
}
