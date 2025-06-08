import * as React from "react";

import { styled } from "@mui/material/styles";

import MuiDrawer from "@mui/material/Drawer";

import { customColors } from "../../styles/colors";
import { IconButton, useMediaQuery } from "@mui/material";

import MenuContent from "./MenuContent";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MenuIcon from "@mui/icons-material/Menu";

const openedMixin = (theme) => ({
  display: "flex",
  flexDirection: "column",

  paddingTop: "4rem",
  paddingLeft: "2rem",

  width: "15vw",

  backgroundColor: customColors.transparent,

  border: "0px",

  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  paddingTop: "4rem",

  border: "0px",

  backgroundColor: customColors.transparent,

  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  overflowX: "hidden",

  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(10)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",

  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function SideMenu() {
  const [open, setOpen] = React.useState(true);

  const handleOpenMenu = () => setOpen((state) => !state);

  const hiddenDrawer = useMediaQuery("(max-width:1000px)");

  const _open = open && !hiddenDrawer;

  return (
    <Drawer variant="permanent" open={_open} sx={{ zIndex: 10 }}>
      {!hiddenDrawer && (
        <IconButton
          onClick={handleOpenMenu}
          sx={{
            width: "fit-content",
            alignSelf: _open ? "flex-end" : "center",
            marginRight: _open ? "1rem" : "0rem",
          }}
        >
          {_open ? <ChevronLeftIcon /> : <MenuIcon />}
        </IconButton>
      )}

      <MenuContent open={_open} />
    </Drawer>
  );
}
