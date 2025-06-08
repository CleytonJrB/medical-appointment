import { Stack } from "@mui/material";

import { CommonMainContainer } from "../../styles/common";

import HomeHeader from "../../components/homeHeader/HomeHeader";

export default function Home() {
  return (
    <Stack direction="column" position="relative">
      <HomeHeader />

      <CommonMainContainer>
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-4xl font-bold mb-4">Welcome to My App</h1>
          <p className="text-lg">This is the home page.</p>
        </div>
      </CommonMainContainer>
    </Stack>
  );
}
