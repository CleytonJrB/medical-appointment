import { Navigate } from "react-router-dom";

import { useCurrentUser } from "../../hooks/use-current-user";

import { routes } from "../../utils/general";

import { Stack } from "@mui/material";

export default function PublicRoute({ children }) {
  const user = useCurrentUser();

  const isAuthenticated = !!user;

  if (isAuthenticated) {
    const isAdmin = user?.type === "ADMIN";

    if (isAdmin) return <Navigate to={routes.protected.allDoctors} replace />;

    return <Navigate to={routes.protected.dashboard} replace />;
  }

  return <Stack position="relative">{children}</Stack>;
}
