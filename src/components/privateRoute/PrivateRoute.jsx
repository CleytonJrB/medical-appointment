import { Navigate } from "react-router-dom";

import { routes } from "../../utils/general";

import SideMenu from "../menu/SideMenu";

import { Stack, useMediaQuery } from "@mui/material";

const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");

  const hasToken = !!token;

  console.log("isAuthenticated:", hasToken);

  return true;
};

export default function PrivateRoute({ children }) {
  const isMobile = useMediaQuery("(max-width:800px)");

  const isMobileDirection = isMobile ? "column-reverse" : "row";

  if (!isAuthenticated()) {
    return <Navigate to={routes.public.login} replace />;
  }

  return (
    <Stack direction={isMobileDirection} position="relative">
      <SideMenu />

      {children}
    </Stack>
  );
}
