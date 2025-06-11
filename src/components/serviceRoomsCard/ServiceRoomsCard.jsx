import { customColors } from "../../styles/colors";

import Card from "@mui/material/Card";

import { Chip, Divider, Stack, Tooltip } from "@mui/material";

import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import CustomIcon from "../customIcon/CustomIcon";

export default function ServiceRoomsCard({
  onEditClick,
  onUpdateStatusClick,
  isLoading,
  ...props
}) {
  const {
    name = `Sala ${props.item}`,
    description = "Boa para tal tal tal...",
    status,
    appointments = [],
  } = props || {};

  const iconLockFromStatus = status === "active" ? "lockOut" : "lockOpen";
  const toolFromStatus = status === "active" ? "Tracar Sala" : "Abrir Sala";

  const appointmentsCount = appointments?.length;

  const appointmentChipStatus = {
    label: status === "active" ? "Ativa" : "Inativa",
    color: status === "active" ? "success" : "error",
  };

  return (
    <Card
      sx={{
        minWidth: 345,
        transition: "0.3s ease",
        "@media (max-width: 800px)": { minWidth: "100%" },
      }}
    >
      <Stack alignItems={"center"} padding={2}>
        <Stack p={4} bgcolor={"GrayText"} borderRadius={999}>
          <CustomIcon icon={"chair"} color={customColors.white} />
        </Stack>
      </Stack>

      <CardContent>
        <Typography variant="body1" fontWeight={600}>
          {name}
        </Typography>

        <Typography variant="body2">{description}</Typography>

        <Typography variant="caption" color="text.secondary">
          {appointmentsCount} consultas agendadas
        </Typography>

        <Divider sx={{ marginTop: "0.5rem", marginBottom: "0.5rem" }} />

        <Chip
          label={appointmentChipStatus.label}
          color={appointmentChipStatus.color}
        />
      </CardContent>

      <CardActions disableSpacing>
        <Tooltip title={toolFromStatus} placement="top">
          <IconButton
            aria-label={iconLockFromStatus}
            disabled={isLoading}
            loading={isLoading}
            onClick={async () => await onUpdateStatusClick(props)}
          >
            <CustomIcon icon={iconLockFromStatus} />
          </IconButton>
        </Tooltip>

        <Tooltip title={"Editar Sala"} placement="top">
          <IconButton
            aria-label={iconLockFromStatus}
            disabled={isLoading}
            loading={isLoading}
            onClick={async () => await onEditClick(props)}
          >
            <CustomIcon icon={"edit"} />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
