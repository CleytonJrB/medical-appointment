import { genderList } from "../../constantes";

import { formatedDateDayMonthYearHoursMinutes } from "../../utils/formatDate";
import { appointmentChipByStatus } from "../../utils/appointments";

import { Chip, Stack, Typography } from "@mui/material";

import CustomThreeDots from "../customThreeDots/CustomThreeDots";
import CustomAccordion from "../customAccordion/CustomAccordion";

export default function AppointmentCard({
  customMenus,
  userTypeIsDoctor = false,
  disabledThreeDots = false,
  ...props
}) {
  const {
    id,
    doctor,
    appointmentDate,
    patientGender,
    patientName,
    patientEmail,
    patientPhone,
    patientBirthDate,
    status,
    reasonConsultation,
    serviceRoom,
  } = props;

  const doctorSelected = doctor;

  const appointmentChip = appointmentChipByStatus(status);

  function renderSummaryDoctorAndDate() {
    const dateFormatted = formatedDateDayMonthYearHoursMinutes(
      appointmentDate,
      true
    );

    return (
      <Stack>
        {!userTypeIsDoctor && (
          <>
            <Typography variant="h6" fontWeight={600}>
              Médico
            </Typography>

            <Typography variant="body1">{doctorSelected?.name}</Typography>
          </>
        )}

        <Typography variant="h6" fontWeight={600} mt={2}>
          Data da Consulta
        </Typography>

        <Typography variant="body1">{dateFormatted}</Typography>

        {serviceRoom && (
          <>
            <Typography variant="h6" fontWeight={600} mt={2}>
              Sala de Atendimento
            </Typography>

            <Typography variant="body1">{serviceRoom.name}</Typography>

            <Typography variant="body1">{serviceRoom.description}</Typography>
          </>
        )}
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

  function renderReasonConsultation() {
    return (
      <Stack>
        <Typography variant="h6" fontWeight={600}>
          Motivo da Consulta
        </Typography>

        <Typography variant="body1">{reasonConsultation}</Typography>
      </Stack>
    );
  }

  function renderSummaryChildren() {
    return (
      <Stack
        direction="row"
        gap={2}
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        marginRight={1}
      >
        <Stack
          direction="row"
          gap={1}
          width="80%"
          flexWrap={"wrap"}
          alignItems="center"
          justifyContent="flex-start"
        >
          <Stack direction="column" gap={1} width="100%">
            {!userTypeIsDoctor && (
              <>
                <Typography variant="body2">Médico</Typography>

                <Typography variant="body1" fontWeight={500}>
                  {doctorSelected?.name}
                </Typography>
              </>
            )}

            {userTypeIsDoctor && (
              <>
                <Typography variant="body2" sx={{ opacity: 0.6 }}>
                  Nome do Paciente
                </Typography>

                <Typography variant="body1" fontWeight={500}>
                  {patientName}
                </Typography>
              </>
            )}
          </Stack>

          <Stack direction="column" gap={1} width="100%">
            <Typography variant="body2" sx={{ opacity: 0.6 }}>
              Data da Consulta
            </Typography>

            <Typography variant="body1" fontWeight={500}>
              {formatedDateDayMonthYearHoursMinutes(appointmentDate, true)}
            </Typography>
          </Stack>

          <Chip
            label={appointmentChip.label}
            color={appointmentChip.color}
            sx={{ fontWeight: 700 }}
          />
        </Stack>

        <CustomThreeDots
          menus={customMenus}
          disabled={disabledThreeDots}
          styled={{
            borderRadius: "1rem",
          }}
        />
      </Stack>
    );
  }

  function renderDetailsChildren() {
    return (
      <Stack direction="column" gap={2} alignItems="baseline" width="100%">
        {renderSummaryDoctorAndDate()}
        {renderSummaryPacient()}
        {renderReasonConsultation()}
      </Stack>
    );
  }

  return (
    <CustomAccordion
      index={id}
      summaryChildren={renderSummaryChildren()}
      detailsChildren={renderDetailsChildren()}
    />
  );
}
