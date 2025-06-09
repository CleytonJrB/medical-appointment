import * as React from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../hooks/use-current-user";

import { styled } from "@mui/material/styles";

import MuiDrawer from "@mui/material/Drawer";

import { customColors } from "../../styles/colors";
import {
  BottomNavigation,
  BottomNavigationAction,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import { menuSideBarList } from "../../constantes/menu-data";

import CustomIcon from "../customIcon/CustomIcon";
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
  const navigate = useNavigate();

  const location = useLocation();
  const user = useCurrentUser();

  const [open, setOpen] = React.useState(true);

  const pathname = location.pathname;

  const userType = user?.type || null;

  const hiddenDrawer = useMediaQuery("(max-width:1000px)");
  const isMobile = useMediaQuery("(max-width:800px)");

  const _open = open && !hiddenDrawer;

  const handleOpenMenu = () => setOpen((state) => !state);

  function renderBottomNavigation(item) {
    const { text, icon, link, redirect } = item;

    const isSelected = link.includes(pathname);
    const customBackgroundColor = isSelected
      ? "dimgray"
      : customColors.transparent;

    const customIconColor = isSelected
      ? customColors.white
      : customColors.black;

    return (
      <BottomNavigationAction
        key={text}
        value={text}
        icon={<CustomIcon icon={icon} color={customIconColor} />}
        sx={{
          padding: "1rem 0rem",
          backgroundColor: customBackgroundColor,
          transition: "all 0.3s ease",
        }}
        onClick={() => navigate(redirect)}
      />
    );
  }

  if (isMobile) {
    return (
      <BottomNavigation
        sx={{ position: "fixed", bottom: 0, width: "100%", zIndex: 999 }}
      >
        {menuSideBarList(userType).map(renderBottomNavigation)}
      </BottomNavigation>
    );
  }

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

      <MenuContent
        open={_open}
        location={location}
        user={user}
        navigate={navigate}
      />
    </Drawer>
  );
}
