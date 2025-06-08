import { customColors } from "../../styles/colors";

import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import MedicationRoundedIcon from "@mui/icons-material/MedicationRounded";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";

export default function CustomIcon({
  icon,
  size = "1.5rem",
  color = customColors.black80,
}) {
  const icons = {
    dashboard: <DashboardCustomizeRoundedIcon sx={{ fontSize: size, color }} />,
    medication: <MedicationRoundedIcon sx={{ fontSize: size, color }} />,
    cottage: <CottageOutlinedIcon sx={{ fontSize: size, color }} />,
    medicalServices: (
      <MedicalServicesOutlinedIcon sx={{ fontSize: size, color }} />
    ),
    eventNote: <EventNoteOutlinedIcon sx={{ fontSize: size, color }} />,
  };

  return icons[icon] || <></>;
}
