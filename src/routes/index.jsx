import { Route, Routes } from "react-router-dom";

import { routes } from "../utils/general";

import PublicRoute from "../components/publicRoute/publicRoute";
import PrivateRoute from "../components/privateRoute/PrivateRoute";

import Home from "../pages/[public]/Home";
import Login from "../pages/[public]/Login";
import Register from "../pages/[public]/Register";
import DoctorRegister from "../pages/[public]/DoctorRegister";

import Dashboard from "../pages/[private]/Dashboard";
import MedicalDetails from "../pages/[private]/MedicalDetails";
import Appointments from "../pages/[private]/Appointments";
import AppointmentsCreate from "../pages/[private]/AppointmentsCreate";
import AllDoctors from "../pages/[private]/AllDoctors";
import MedicalAppointments from "../pages/[private]/MedicalAppointments";
import ServiceRooms from "../pages/[private]/ServiceRooms";
import Reports from "../pages/[private]/Reports";
import AllAppointments from "../pages/[private]/AllAppointments";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={routes.public.home} element={<Home />} />
      <Route
        path={routes.public.login}
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path={routes.public.register}
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path={routes.public.doctorRegister}
        element={
          <PublicRoute>
            <DoctorRegister />
          </PublicRoute>
        }
      />

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
      <Route
        path={routes.protected.appointments}
        element={
          <PrivateRoute>
            <Appointments />
          </PrivateRoute>
        }
      />
      <Route
        path={routes.protected.appointmentsCreate}
        element={
          <PrivateRoute>
            <AppointmentsCreate />
          </PrivateRoute>
        }
      />
      <Route
        path={routes.protected.allDoctors}
        element={
          <PrivateRoute>
            <AllDoctors />
          </PrivateRoute>
        }
      />
      <Route
        path={routes.protected.medicalAppointments}
        element={
          <PrivateRoute>
            <MedicalAppointments />
          </PrivateRoute>
        }
      />
      <Route
        path={routes.protected.serviceRooms}
        element={
          <PrivateRoute>
            <ServiceRooms />
          </PrivateRoute>
        }
      />
      <Route
        path={routes.protected.reports}
        element={
          <PrivateRoute>
            <Reports />
          </PrivateRoute>
        }
      />
      <Route
        path={routes.protected.AllAppointments}
        element={
          <PrivateRoute>
            <AllAppointments />
          </PrivateRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
