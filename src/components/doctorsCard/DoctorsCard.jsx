import { formattedHours } from "../../utils/general";

import {
  Card,
  CardContent,
  Chip,
  Rating,
  Stack,
  Typography,
} from "@mui/material";

import StarIcon from "@mui/icons-material/Star";

export default function DoctorsCard({ doctor, handleSelectedHour = () => {} }) {
  const { name, specialtys = [], rating = 3, hours } = doctor;

  function handleClick(date) {
    handleSelectedHour(date);
  }

  function renderSpecialties(item, index) {
    return <Chip key={index} label={item} />;
  }

  function renderHours(item, index) {
    const label = formattedHours(item);

    return <Chip key={index} label={label} onClick={() => handleClick(item)} />;
  }

  return (
    <Card sx={{ minWidth: "5rem" }}>
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

          <Stack direction="row" gap={0.5}>
            {specialtys.map(renderSpecialties)}
          </Stack>

          <Stack direction="row" gap={0.5}>
            {hours.map(renderHours)}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
