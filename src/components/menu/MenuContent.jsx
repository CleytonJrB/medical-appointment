import * as React from "react";

import { useSession } from "../../hooks/use-session";

import { customColors } from "../../styles/colors";
import { stringToColor } from "../../utils/string-to-avatar";

import { menuSideBarList } from "../../constantes/menu-data";

import CustomIcon from "../customIcon/CustomIcon";

import { Avatar } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { List } from "@mui/material";
import { ListItem } from "@mui/material";
import { ListItemButton } from "@mui/material";
import { ListItemIcon } from "@mui/material";
import { ListItemText } from "@mui/material";
import { Menu } from "@mui/material";
import { Stack } from "@mui/material";
import { Tooltip } from "@mui/material";
import { Typography } from "@mui/material";

import * as S from "./styles";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

export default function MenuContent({
  open,
  location,
  user,
  navigate,
  isLoading,
  handleLogout,
}) {
  const session = useSession();

  const pathname = location.pathname;

  const loadingSession = session?.status === "loading";

  const userName = user?.name || null;
  const userEmail = user?.email || null;
  const userType = user?.type || null;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const openProfileMenu = Boolean(anchorEl);

  const _menuSideBarList = menuSideBarList(userType);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  function conditionToLoading(isLogout) {
    return isLoading && isLogout;
  }

  function handleNavigateMenu(link) {
    if (pathname === link) return;

    navigate(link);
  }

  function stringAvatar(name) {
    if (!name) return null;

    const nameSplit = name.split(" ");
    const firstName = nameSplit[0];
    const lastName = nameSplit[1];

    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${firstName ? firstName[0] : ""}${
        lastName ? lastName[0] : ""
      }`,
    };
  }

  function renderAvatar() {
    if (loadingSession) {
      return (
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          gap={".5rem"}
          marginBottom={"2rem"}
        >
          <Avatar {...stringAvatar(null)} sx={{ alignSelf: "center" }}>
            <CircularProgress size="1rem" />
          </Avatar>
        </Stack>
      );
    }

    return (
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        gap={".5rem"}
        marginBottom={"2rem"}
      >
        <Tooltip title={"Abrir menu de perfil"}>
          <S.StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
            id="demo-positioned-button"
            aria-controls={openProfileMenu ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openProfileMenu ? "true" : undefined}
            onClick={handleClick}
            sx={{
              cursor: "pointer",
            }}
          >
            <Avatar {...stringAvatar(userName)} sx={{ alignSelf: "center" }} />
          </S.StyledBadge>
        </Tooltip>

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
          {!open && (
            <S.CustomMenuItem disabled>
              <Typography
                color={customColors.black50}
                fontSize={"0.9rem"}
                noWrap
              >
                {userEmail}
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

        {open && <Typography>{userEmail}</Typography>}
      </Stack>
    );
  }

  function renderMenuItem(item) {
    return (
      <ListItem key={item.text} disablePadding sx={{ mb: "0.25rem" }}>
        <ListItemButton
          key={item.text}
          onClick={() => handleNavigateMenu(item.redirect)}
          selected={item.link.includes(pathname)}
          sx={[
            {
              display: "flex",
              width: "100%",
              minHeight: "2.5rem",
              px: 2.5,
              borderRadius: ".75rem",
            },
            open
              ? {
                  justifyContent: conditionToLoading(item.text == "Sair")
                    ? "center"
                    : "initial",
                }
              : {
                  justifyContent: "center",
                },
          ]}
        >
          {conditionToLoading(item.text == "Sair") && (
            <CircularProgress size="1rem" />
          )}

          {!conditionToLoading(item.text == "Sair") && (
            <>
              <ListItemIcon
                sx={[
                  {
                    display: "flex",
                    minWidth: 0,
                    justifyContent: "center",
                  },
                  open
                    ? {
                        mr: ".5rem",
                      }
                    : {
                        mr: "0rem",
                      },
                ]}
              >
                <CustomIcon icon={item.icon} />
              </ListItemIcon>

              <ListItemText
                sx={[
                  open
                    ? {
                        display: "block",
                      }
                    : {
                        display: "none",
                      },
                ]}
              >
                <Typography
                  color={customColors.black50}
                  fontSize={"0.9rem"}
                  noWrap
                  fontWeight={500}
                >
                  {item.text}
                </Typography>
              </ListItemText>
            </>
          )}
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <Stack sx={{ height: "100vh" }} justifyContent={"space-between"}>
      <List sx={{ p: "1rem" }}>{_menuSideBarList?.map(renderMenuItem)}</List>

      {renderAvatar()}
    </Stack>
  );
}
