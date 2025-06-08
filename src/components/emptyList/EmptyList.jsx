import { useNavigate } from "react-router-dom";

import { Button, Stack, Typography } from "@mui/material";
import { routes } from "../../utils/general";

export default function EmptyList({ simple = false }) {
  const navigate = useNavigate();

  const commonTextStyles = {
    textAlign: "center",
  };

  const textVariant = simple
    ? "Parece que essa lista está vazia."
    : "Parece que essa lista está vazia. Sinta-se à vontade pra clicar no botão abaixo e criar um novo agendamento!";

  return (
    <Stack
      flexDirection="column"
      maxWidth={"40%"}
      alignItems={"center"}
      alignSelf={"center"}
      justifyContent={"center"}
      gap={"0.5rem"}
      padding={"2.5rem"}
    >
      <Typography
        sx={[{ paddingTop: "0.8rem" }, commonTextStyles]}
        variant="h5"
        fontWeight={700}
      >
        Não há nada ainda
      </Typography>

      <Typography sx={commonTextStyles} variant="body1" fontWeight={400}>
        {textVariant}
      </Typography>

      {!simple && (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(routes.protected.appointmentsCreate)}
        >
          Criar novo agendamento
        </Button>
      )}
    </Stack>
  );
}
