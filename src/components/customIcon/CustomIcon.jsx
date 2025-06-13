import { customColors } from "../../styles/colors";

import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";
import CottageOutlinedIcon from "@mui/icons-material/CottageOutlined";
import MedicalServicesOutlinedIcon from "@mui/icons-material/MedicalServicesOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import TurnedInNotOutlinedIcon from "@mui/icons-material/TurnedInNotOutlined";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import MedicalInformationOutlinedIcon from "@mui/icons-material/MedicalInformationOutlined";
import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

export default function CustomIcon({
  icon,
  size = "1.5rem",
  color = customColors.black80,
}) {
  const icons = {
    dashboard: (
      <DashboardCustomizeRoundedIcon
        sx={{ fontSize: size, color, transition: "all 0.3s ease" }}
      />
    ),
    medication: (
      <MedicationOutlinedIcon
        sx={{ fontSize: size, color, transition: "all 0.3s ease" }}
      />
    ),
    cottage: (
      <CottageOutlinedIcon
        sx={{ fontSize: size, color, transition: "all 0.3s ease" }}
      />
    ),
    medicalServices: (
      <MedicalServicesOutlinedIcon
        sx={{ fontSize: size, color, transition: "all 0.3s ease" }}
      />
    ),
    eventNote: (
      <EventNoteOutlinedIcon
        sx={{ fontSize: size, color, transition: "all 0.3s ease" }}
      />
    ),
    turned: (
      <TurnedInNotOutlinedIcon
        sx={{ fontSize: size, color, transition: "all 0.3s ease" }}
      />
    ),
    analytic: (
      <AnalyticsOutlinedIcon
        sx={{ fontSize: size, color, transition: "all 0.3s ease" }}
      />
    ),
    medical: (
      <MedicalInformationOutlinedIcon
        sx={{ fontSize: size, color, transition: "all 0.3s ease" }}
      />
    ),
    chair: (
      <ChairOutlinedIcon
        sx={{ fontSize: size, color, transition: "all 0.3s ease" }}
      />
    ),
    lockOpen: (
      <LockOpenOutlinedIcon
        sx={{ fontSize: size, color, transition: "all 0.3s ease" }}
      />
    ),
    lockOut: (
      <LockOutlinedIcon
        sx={{ fontSize: size, color, transition: "all 0.3s ease" }}
      />
    ),
    assignmentInd: (
      <AssignmentIndOutlinedIcon
        sx={{ fontSize: size, color, transition: "all 0.3s ease" }}
      />
    ),
    edit: (
      <ModeEditOutlineOutlinedIcon
        sx={{ fontSize: size, color, transition: "all 0.3s ease" }}
      />
    ),
  };

  return icons[icon] || <></>;
}
