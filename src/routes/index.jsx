import { Route, Routes } from "react-router-dom";

import PrivateRoute from "../components/PrivateRoute";

import { routes } from "../utils/general";

import Home from "../pages/[public]/Home";
import Login from "../pages/[public]/Login";
import Register from "../pages/[public]/Register";

import Dashboard from "../pages/[private]/Dashboard";
import MedicalDetails from "../pages/[private]/MedicalDetails";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={routes.public.home} element={<Home />} />
      <Route path={routes.public.login} element={<Login />} />
      <Route path={routes.public.register} element={<Register />} />

      {/* Private Routes */}
      <Route
        path={routes.protected.dashboard}
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path={routes.protected.details}
        element={
          <PrivateRoute>
            <MedicalDetails />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
