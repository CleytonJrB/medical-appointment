import { useNavigate } from "react-router-dom";

import { genderList } from "../../constantes";

import { formatedDateDayMonthYearHoursMinutes } from "../../utils/formatDate";

import { customColors } from "../../styles/colors";

import { Card, CardContent, Stack, Typography } from "@mui/material";
import CustomThreeDots from "../customThreeDots/CustomThreeDots";

import FreeCancellationRoundedIcon from "@mui/icons-material/FreeCancellationRounded";
import PublishedWithChangesRoundedIcon from "@mui/icons-material/PublishedWithChangesRounded";
import { routes } from "../../utils/general";

export default function AppointmentCard({ ...props }) {
  const navigate = useNavigate();

  const {
    doctor,
    appointmentDate,
    patientGender,
    patientName,
    patientEmail,
    patientPhone,
    patientBirthDate,
  } = props;

  const customMenus = () => {
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
          navigate(routes.protected.appointmentsCreate, { state: props }),
        icon: () => <PublishedWithChangesRoundedIcon />,
      },
    ];
  };

  function renderSummaryDoctorAndDate() {
    const doctorSelected = doctor;

    const dateFormatted = formatedDateDayMonthYearHoursMinutes(
      appointmentDate,
      true
    );

    return (
      <Stack>
        <Typography variant="h6" fontWeight={600}>
          Médico
        </Typography>

        <Typography variant="body1">{doctorSelected.name}</Typography>

        <Typography variant="h6" fontWeight={600} mt={2}>
          Data da Consulta
        </Typography>

        <Typography variant="body1">{dateFormatted}</Typography>
      </Stack>
    );
  }

  function renderSummaryPacient() {
    const getGenderText =
      genderList?.find((g) => g.id == patientGender)?.label ?? "";

    return (
      <Stack>
        <Typography variant="h6" fontWeight={600}>
          Paciente
        </Typography>

        <Typography variant="body1">{patientName}</Typography>

        <Typography variant="body1">{patientEmail}</Typography>

        <Typography variant="body1">{patientPhone}</Typography>

        <Typography variant="body1">
          {formatedDateDayMonthYearHoursMinutes(patientBirthDate)}
        </Typography>

        <Typography variant="body1">{getGenderText}</Typography>
      </Stack>
    );
  }

  return (
    <Card
      sx={{
        transition: "border-color 0.6s ease",
        width: "100%",
      }}
    >
      <CardContent>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={2}
        >
          <Stack gap={"1rem"}>
            {renderSummaryDoctorAndDate()}
            {renderSummaryPacient()}
          </Stack>

          <CustomThreeDots
            menus={customMenus()}
            styled={{
              borderRadius: "1rem",
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}
