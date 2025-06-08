import { MenuItem, styled, Badge } from "@mui/material";
import { customColors } from "../../styles/colors";

export const CustomMenuItem = styled(MenuItem)({
  display: "flex",
  alignItems: "center",

  gap: "0.3rem",
  marginLeft: ".8rem",
  marginRight: ".8rem",
  borderRadius: "0.4rem",
  paddingTop: "0.8rem",
  paddingBottom: "0.8rem",

  maxWidth: "300px",

  transition: "all 0.3s ease-in-out",
});

export const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: customColors.green,
    color: customColors.green,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: -1,
      left: -1,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
