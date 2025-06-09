import { formattedHours } from "../../utils/general";
import { isSameMinute } from "date-fns";

import {
  Card,
  CardContent,
  Chip,
  Rating,
  Stack,
  Typography,
} from "@mui/material";

import { customColors } from "../../styles/colors";

import StarIcon from "@mui/icons-material/Star";

export default function DoctorsCard({
  doctor,
  handleSelectedDoctor = () => {},
  doctorIsSelected = false,
  hoursSelected = null,
  hasSelectedHoues = false,
}) {
  const { name, specialtys = [], rating = 3, hours, description = "" } = doctor;

  function handleClick(date) {
    handleSelectedDoctor({ dateTime: date, doctor });
  }

  function renderSpecialties(item, index) {
    return <Chip key={index} label={item} variant="outlined" />;
  }

  function renderHours(item, index) {
    const label = formattedHours(item);

    const hoursIsSelected =
      doctorIsSelected && isSameMinute(item, hoursSelected);

    return (
      <Chip
        key={index}
        label={label}
        onClick={() => handleClick(item)}
        color={hoursIsSelected ? "success" : "default"}
        sx={{ transition: "background-color 0.3s ease" }}
      />
    );
  }

  return (
    <Card
      sx={{
        border: doctorIsSelected
          ? `2px solid ${customColors.green}`
          : "1px solid #ccc",
        transition: "border-color 0.6s ease",
      }}
    >
      <CardContent>
        <Stack spacing={1}>
          <Typography gutterBottom variant="body1">
            {name}
          </Typography>

          <Rating
            name="text-feedback"
            value={rating}
            readOnly
            precision={0.5}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />

          <Typography gutterBottom variant="body1">
            {description}
          </Typography>

          <Stack direction="row" gap={0.5}>
            {specialtys.map(renderSpecialties)}
          </Stack>

          {hasSelectedHoues && (
            <>
              <Typography variant="body2" pt={1}>
                Horários disponíveis, escolha o que melhor se encaixa na sua
                agenda:
              </Typography>

              <Stack direction="row" gap={0.5}>
                {hours.map(renderHours)}
              </Stack>
            </>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
