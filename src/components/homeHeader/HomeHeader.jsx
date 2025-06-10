import { useAuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

import { routes } from "../../utils/general";

import * as S from "./styles";

import { Button, Stack, Typography } from "@mui/material";

export default function HomeHeader({ simple = false }) {
  const { token } = useAuthContext();

  const navigate = useNavigate();

  function handleNavigate(link) {
    navigate(link);
  }

  function renderActions() {
    if (token) {
      return (
        <Button
          variant="text"
          onClick={() => handleNavigate(routes.protected.dashboard)}
          sx={{
            color: "primary.main",
            textTransform: "none",
            fontFamily: "Roboto, sans-serif",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <Typography variant="h6" color="primary">
            Dashboard
          </Typography>
        </Button>
      );
    }

    if (simple) return null;

    return (
      <Stack direction="row" spacing={2} alignItems="center">
        <Button
          variant="text"
          onClick={() => handleNavigate(routes.public.login)}
          sx={{
            color: "primary.main",
            textTransform: "none",
            fontFamily: "Roboto, sans-serif",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <Typography variant="h6" color="primary">
            Login
          </Typography>
        </Button>

        <Button
          variant="text"
          onClick={() => handleNavigate(routes.public.register)}
          sx={{
            color: "primary.main",
            textTransform: "none",
            fontFamily: "Roboto, sans-serif",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <Typography variant="h6" color="primary">
            Registro
          </Typography>
        </Button>
      </Stack>
    );
  }

  return (
    <S.HeaderContainer>
      <img
        className="logo"
        src={"src/assets/medical-logo.png"}
        alt={"logo"}
        style={{ cursor: "pointer" }}
        onClick={() => handleNavigate(routes.public.home)}
      />

      {renderActions()}
    </S.HeaderContainer>
  );
}
