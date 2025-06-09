import { customColors } from "../../styles/colors";

import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import MedicalInformationOutlinedIcon from "@mui/icons-material/MedicalInformationOutlined";

export default function CustomIcon({
  icon,
  size = "1.5rem",
  color = customColors.black80,
}) {
  const icons = {
    dashboard: <DashboardCustomizeRoundedIcon sx={{ fontSize: size, color }} />,
    medication: <MedicationOutlinedIcon sx={{ fontSize: size, color }} />,
    cottage: <CottageOutlinedIcon sx={{ fontSize: size, color }} />,
    medicalServices: (
      <MedicalServicesOutlinedIcon sx={{ fontSize: size, color }} />
    ),
    eventNote: <EventNoteOutlinedIcon sx={{ fontSize: size, color }} />,
    turned: <TurnedInNotOutlinedIcon sx={{ fontSize: size, color }} />,
    analytic: <AnalyticsOutlinedIcon sx={{ fontSize: size, color }} />,
    medical: <MedicalInformationOutlinedIcon sx={{ fontSize: size, color }} />,
  };

  return icons[icon] || <></>;
}
