import { routes } from "../utils/general";

export const menuSideBarList = (userType) => {
  if (userType === "ADMIN") {
    return [
      {
        text: "Home",
        icon: "cottage",
        link: [routes.protected.dashboard],
        redirect: routes.protected.dashboard,
      },
      {
        text: "Todos Médicos",
        icon: "medicalServices",
        link: [routes.protected.allDoctors],
        redirect: routes.protected.allDoctors,
      },
      {
        text: "Salas de Atendimento",
        icon: "chair",
        link: [routes.protected.serviceRooms],
        redirect: routes.protected.serviceRooms,
      },
      {
        text: "Relatórios",
        icon: "analytic",
        link: [routes.protected.reports],
        redirect: routes.protected.reports,
      },
    ];
  }

  if (userType === "DOCTOR") {
    return [
      {
        text: "Home",
        icon: "cottage",
        link: [routes.protected.dashboard],
        redirect: routes.protected.dashboard,
      },
      {
        text: "Minhas Consultas",
        icon: "turned",
        link: [routes.protected.medicalAppointments],
        redirect: routes.protected.medicalAppointments,
      },
    ];
  }

  return [
    {
      text: "Home",
      icon: "cottage",
      link: [routes.protected.dashboard],
      redirect: routes.protected.dashboard,
    },
    {
      text: "Todos Médicos",
      icon: "medicalServices",
      link: [routes.protected.allDoctors],
      redirect: routes.protected.allDoctors,
    },
    {
      text: "Agendamentos",
      icon: "eventNote",
      link: [routes.protected.appointments],
      redirect: routes.protected.appointments,
    },
  ];
};
