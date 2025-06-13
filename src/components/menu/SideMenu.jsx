import * as React from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../hooks/use-current-user";
import { useAuthContext } from "../../providers/AuthProvider";

import { routes } from "../../utils/general";

import { styled } from "@mui/material/styles";
import * as S from "./styles";

import MuiDrawer from "@mui/material/Drawer";

import { customColors } from "../../styles/colors";
import {
  BottomNavigation,
  BottomNavigationAction,
  IconButton,
  Menu,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { menuSideBarList } from "../../constantes/menu-data";

import CustomIcon from "../customIcon/CustomIcon";
import MenuContent from "./MenuContent";

import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import SubjectRoundedIcon from "@mui/icons-material/SubjectRounded";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import CustomDialog from "../customDialog/CustomDialog";
import SettingsDialog from "../dialogs/SettingsDialog";

const openedMixin = () => ({
  display: "flex",
  flexDirection: "column",

  paddingTop: "3rem",
  paddingLeft: "2rem",

  width: "15vw",

  backgroundColor: customColors.transparent,

  border: "0px",

  transition: "all 0.3s ease",

  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  paddingTop: "3rem",

  border: "0px",

  backgroundColor: customColors.transparent,

  transition: "all 0.3s ease",

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

  transition: "all 0.3s ease",

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

  const { logout } = useAuthContext();

  const hiddenDrawer = useMediaQuery("(max-width:1000px)");
  const isMobile = useMediaQuery("(max-width:800px)");

  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [openCloseSettingsDialog, setOpenCloseSettingsDialog] = React.useState({
    open: false,
    hospital: null,
  });

  const userEmail = user?.email || null;

  const openProfileMenu = Boolean(anchorEl);

  const pathname = location.pathname;

  const userType = user?.type || null;
  const isAdmin = userType === "ADMIN";

  const _open = open && !hiddenDrawer;

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  const handleOpenMenu = () => setOpen((state) => !state);
  const handleClose = () => setAnchorEl(null);

  function handleCloseOpenSettingsDialog(hospital) {
    setOpenCloseSettingsDialog((state) => {
      return {
        open: !state.open,
        serviceRooms: hospital ?? null,
      };
    });
  }

  async function handleLogout() {
    try {
      setIsLoading(true);

      logout();

      navigate(routes.public.home);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function renderBottomNavigation(item) {
    const { text, icon, link, redirect } = item;

    const isSelected = link.includes(pathname);
    const customBackgroundColor = isSelected
      ? customColors.customBlue50
      : customColors.transparent;

    const customIconColor = isSelected
      ? customColors.customYellow
      : customColors.black;

    return (
      <BottomNavigationAction
        key={text}
        value={text}
        icon={<CustomIcon icon={icon} color={customIconColor} />}
        sx={{
          padding: "1.5rem 0rem",
          backgroundColor: customBackgroundColor,
          transition: "all 0.3s ease",
        }}
        onClick={() => navigate(redirect)}
      />
    );
  }

  if (isMobile) {
    return (
      <>
        <CustomDialog
          open={openCloseSettingsDialog.open}
          handleCloseDialog={() => handleCloseOpenSettingsDialog(null)}
        >
          <SettingsDialog
            handleCloseOpenSettingsDialog={() =>
              handleCloseOpenSettingsDialog(null)
            }
            hospital={openCloseSettingsDialog.hospital}
          />
        </CustomDialog>

        <BottomNavigation
          sx={{ position: "fixed", bottom: 0, width: "100%", zIndex: 999 }}
        >
          {menuSideBarList(userType).map(renderBottomNavigation)}

          <BottomNavigationAction
            value={"Perfil"}
            icon={<CustomIcon icon={"assignmentInd"} />}
            onClick={handleClick}
            sx={{
              padding: "1.5rem 0rem",
              transition: "all 0.3s ease",
            }}
          />

          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={openProfileMenu}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <S.CustomMenuItem disabled>
              <Typography
                color={customColors.black50}
                fontSize={"0.9rem"}
                noWrap
              >
                {userEmail}
              </Typography>
            </S.CustomMenuItem>

            {isAdmin && (
              <S.CustomMenuItem
                onClick={() => handleCloseOpenSettingsDialog(null)}
              >
                <Typography
                  color={customColors.black50}
                  fontSize={"0.9rem"}
                  noWrap
                >
                  Configurações
                </Typography>
              </S.CustomMenuItem>
            )}

            <S.CustomMenuItem onClick={handleLogout}>
              <Stack direction={"row"} alignItems={"center"} gap={".5rem"}>
                <LogoutRoundedIcon
                  style={{ fontSize: "1.25rem", color: customColors.black80 }}
                />

                <Typography color={customColors.black50} fontSize={"0.9rem"}>
                  Sair
                </Typography>
              </Stack>
            </S.CustomMenuItem>
          </Menu>
        </BottomNavigation>
      </>
    );
  }

  return (
    <Drawer variant="permanent" open={_open} sx={{ zIndex: 10 }}>
      <CustomDialog
        open={openCloseSettingsDialog.open}
        handleCloseDialog={() => handleCloseOpenSettingsDialog(null)}
      >
        <SettingsDialog
          handleCloseOpenSettingsDialog={() =>
            handleCloseOpenSettingsDialog(null)
          }
          hospital={openCloseSettingsDialog.hospital}
        />
      </CustomDialog>

      <Tooltip title="Pronto Consulta" placement="right">
        <img
          className="logo"
          src={"public/medical.svg"}
          alt={"logo"}
          width={"40rem"}
          height={"40rem"}
          style={{
            display: "flex",
            alignSelf: "center",
            marginBottom: "1.5rem",
          }}
        />
      </Tooltip>

      {!hiddenDrawer && (
        <IconButton
          onClick={handleOpenMenu}
          sx={{
            width: "fit-content",
            alignSelf: _open ? "flex-end" : "center",
            marginRight: _open ? "1rem" : "0rem",
            transition: "all 0.3s ease",
          }}
        >
          {_open ? (
            <FirstPageRoundedIcon sx={{ color: customColors.black }} />
          ) : (
            <SubjectRoundedIcon sx={{ color: customColors.black }} />
          )}
        </IconButton>
      )}

      <MenuContent
        open={_open}
        location={location}
        user={user}
        navigate={navigate}
        handleLogout={handleLogout}
        isLoading={isLoading}
        handleCloseOpenSettingsDialog={handleCloseOpenSettingsDialog}
        isAdmin={isAdmin}
      />
    </Drawer>
  );
}
