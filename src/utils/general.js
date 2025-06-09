export const routes = {
  public: {
    home: "/",
    login: "/login",
    register: "/register",
  },
  protected: {
    dashboard: "/dashboard",
    details: "/details",
    allDoctors: "/allDoctors",
    appointments: "/appointments",
    appointmentsCreate: "/appointments/create",
    medicalAppointments: "/medicalAppointments",
    serviceRooms: "/serviceRooms",
    reports: "/reports",
    AllAppointments: "/AllAppointments",
  },
};

export function formattedHours(date) {
  const options = { hour: "2-digit", minute: "2-digit" };

  return date.toLocaleTimeString([], options);
}

export function extractYupErrors(yupError) {
  const errors = {};
  if (yupError.inner && yupError.inner.length > 0) {
    yupError.inner.forEach((err) => {
      if (!errors[err.path]) {
        errors[err.path] = err.message;
      }
    });
  } else if (yupError.path) {
    errors[yupError.path] = yupError.message;
  }
  return errors;
}
