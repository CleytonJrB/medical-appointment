import { routes } from "../utils/general";

export const menuSideBarList = (userType) => {
  if (userType === "ADMIN") {
    return [];
  }

  if (userType === "DOCTOR") {
    return [
      {
        text: "Dashboard",
        icon: "dashboard",
        link: [routes.protected.dashboard],
        redirect: routes.protected.dashboard,
      },
      {
        text: "Detalhes Médicos",
        icon: "medication",
        link: [routes.protected.details],
        redirect: routes.protected.details,
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
