import { customColors } from "../../styles/colors";

import { Button, IconButton, Stack, Typography } from "@mui/material";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

export default function CustomDialogToConfirmedAppointment({
  handleOpenCloseDialogConfirmedAppointment,
  appointment,
}) {
  const patientName = appointment?.patientName ?? "";
  const appointmentDate = appointment?.appointmentDate ?? new Date();

  return (
    <Stack gap="1rem" flexDirection="column" padding="1rem" alignItems="center">
      <Stack
        width="100%"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        gap="1rem"
      >
        <Typography variant="h5" fontWeight={700}>
          Confirmar Consulta
        </Typography>

        <IconButton onClick={handleOpenCloseDialogConfirmedAppointment}>
          <CloseRoundedIcon sx={{ color: customColors.black }} />
        </IconButton>
      </Stack>

      <Typography variant="body1">
        Você está prestes a confirmar a consulta com o paciente{" "}
        <strong>{patientName}</strong> para o dia{" "}
        <strong>{new Date(appointmentDate).toLocaleDateString()}</strong> às{" "}
        <strong>
          {new Date(appointmentDate).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </strong>
        .
        <br />
        Por favor, verifique as informações antes de prosseguir.
      </Typography>

      <Stack direction={"row"} gap="1rem" mt="1rem" width="100%">
        <Button
          variant="text"
          fullWidth
          onClick={handleOpenCloseDialogConfirmedAppointment}
        >
          Cancelar
        </Button>

        <Button
          variant="contained"
          disabled={false}
          loading={false}
          fullWidth
          onClick={() => {
            alert("Consulta confirmada com sucesso!");
          }}
        >
          Confirmar Consulta
        </Button>
      </Stack>
    </Stack>
  );
}
