import { Stack, Typography } from "@mui/material";
import CustomDateSelected from "../customDateSelected/CustomDateSelected";
import { useDoctors } from "../../hooks/use-doctors";
import {
  formatedDateDayMonthYearHoursMinutes,
  mergeDateAndTime,
} from "../../utils/formatDate";
import { genderList } from "../../constantes";

export default function AppointCreateFive({ values }) {
  const { data: doctorsList } = useDoctors();

  const {
    //Step One
    date = new Date(),

    //Step Two
    doctor = null,
    dateTime = new Date(),

    //Step Three
    patientName = "",
    patientEmail = "",
    patientPhone = "",
    patientBirthDate = new Date(),
    patientGender = "",

    //Step Four
    reasonConsultation = "",
  } = values;

  function renderSummaryDoctorAndDate() {
    const doctorSelected = doctorsList?.find((doc) => doc?.id == doctor) ?? {};

    const finalDateTime = mergeDateAndTime(date, dateTime);

    const dateFormatted = formatedDateDayMonthYearHoursMinutes(
      finalDateTime,
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

  function renderSummaryReason() {
    return (
      <Stack>
        <Typography variant="h6" fontWeight={600}>
          Motivo da Consulta
        </Typography>

        <Typography variant="body1">{reasonConsultation}</Typography>
      </Stack>
    );
  }

  return (
    <Stack gap={"1rem"}>
      {renderSummaryDoctorAndDate()}
      {renderSummaryPacient()}
      {renderSummaryReason()}
    </Stack>
  );
}
