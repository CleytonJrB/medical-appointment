import { Stack, Typography } from "@mui/material";

import HomeHeader from "../../components/homeHeader/HomeHeader";

export default function Home() {
  return (
    <Stack direction="column" position="relative">
      <HomeHeader />

      <Stack
        alignItems="center"
        justifyContent="center"
        width={"100vw"}
        height={"90vh"}
        gap={2}
      >
        <Typography variant="h1" textAlign={"center"}>
          Pronto Consulta
        </Typography>

        <Typography
          variant="body1"
          fontSize={"1.5rem"}
          textAlign={"center"}
          width={"60%"}
        >
          Agende sua consulta médica de forma rápida, simples e segura. Encontre
          profissionais disponíveis e escolha o melhor horário para você.
        </Typography>
      </Stack>
    </Stack>
  );
}
