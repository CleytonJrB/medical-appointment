import { useCurrentUser } from "../../hooks/use-current-user";
import { useLocation, useNavigate } from "react-router-dom";

import { routes } from "../../utils/general";

import * as S from "./styles";

import { Button, Stack } from "@mui/material";
import { customColors } from "../../styles/colors";

export default function HomeHeader({ simple = false }) {
  const user = useCurrentUser();

  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === routes.public.home;

  function handleNavigate(link) {
    navigate(link);
  }

  function renderActions() {
    if (user) {
      const isAdmin = user?.type === "ADMIN";
      const redirectTo = isAdmin
        ? routes.protected.allDoctors
        : routes.protected.dashboard;

      return (
        <Button
          variant="contained"
          onClick={() => handleNavigate(redirectTo)}
          sx={{
            fontSize: "1rem",
            textTransform: "none",
            backgroundColor: "#56abdf",
            transition: "filter 0.3s ease",
            "&:hover": {
              filter: "brightness(0.9)",
            },
          }}
        >
          Dashboard
        </Button>
      );
    }

    if (simple) return null;

    return (
      <Stack direction="row" spacing={2} alignItems="center">
        <Button
          variant="contained"
          onClick={() => handleNavigate(routes.public.login)}
          sx={{
            fontSize: "1rem",
            textTransform: "none",
            backgroundColor: customColors.customBlue,
            transition: "filter 0.3s ease",
            "&:hover": {
              filter: "brightness(0.9)",
            },
          }}
        >
          Login
        </Button>

        <Button
          variant="contained"
          onClick={() => handleNavigate(routes.public.register)}
          sx={{
            fontSize: "1rem",
            color: "#fff",
            textTransform: "none",
            backgroundColor: customColors.customYellow,
            transition: "filter 0.3s ease",
            "&:hover": {
              filter: "brightness(0.9)",
            },
          }}
        >
          Cadastrar-se
        </Button>
      </Stack>
    );
  }

  return (
    <S.HeaderContainer minHeight={"10vh"} maxHeight={"10vh"}>
      <img
        className="logo"
        src={"public/medical.svg"}
        alt={"logo"}
        style={{ cursor: "pointer" }}
        {...(isHome
          ? {}
          : { onClick: () => handleNavigate(routes.public.home) })}
      />

      {renderActions()}
    </S.HeaderContainer>
  );
}
