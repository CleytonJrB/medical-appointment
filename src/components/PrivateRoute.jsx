import { Navigate } from "react-router-dom";

import { routes } from "../utils/general";

import { Stack } from "@mui/material";
import SideMenu from "./menu/SideMenu";

const isAuthenticated = () => {
  const token = localStorage.getItem("authToken");

  const hasToken = !!token;

  console.log("isAuthenticated:", hasToken);

  return true;
};

export default function PrivateRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to={routes.public.login} replace />;
  }

  return (
    <Stack direction="row" position="relative">
      <SideMenu />

      {children}
    </Stack>
  );
}
