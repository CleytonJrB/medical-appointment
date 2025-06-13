import { Stack, Typography } from "@mui/material";

import HomeHeader from "../components/homeHeader/HomeHeader";

export default function NotFound() {
  return (
    <Stack direction="column" position="relative">
      <HomeHeader />

      <Stack
        alignItems="center"
        justifyContent="center"
        width={"100vw"}
        height={"90vh"}
      >
        <Typography
          variant="h2"
          fontWeight={700}
          align="center"
          sx={{ marginTop: 4 }}
        >
          Page Not Found
        </Typography>

        <Typography
          variant="h5"
          align="center"
          fontWeight="bold"
          sx={{ marginTop: 2 }}
        >
          A página que você está procurando não existe.
        </Typography>

        <Typography
          variant="h6"
          align="center"
          fontWeight="bold"
          sx={{ marginTop: 2 }}
        >
          Por favor, verifique a URL ou retorne para a página inicial.
        </Typography>
      </Stack>
    </Stack>
  );
}
