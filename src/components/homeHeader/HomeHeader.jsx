import { useNavigate } from "react-router-dom";

import { routes } from "../../utils/general";

import * as S from "./styles";

import { Button, Typography } from "@mui/material";

export default function HomeHeader() {
  const navigate = useNavigate();

  function handleNavigate(link) {
    navigate(link);
  }

  return (
    <S.HeaderContainer>
      <img className="logo" src={"src/assets/medical-logo.png"} alt={"logo"} />

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
    </S.HeaderContainer>
  );
}
