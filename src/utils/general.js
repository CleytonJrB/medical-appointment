export const routes = {
  public: {
    home: "/",
    login: "/login",
    register: "/register",
  },
  protected: {
    dashboard: "/dashboard",
    details: "/details",
    appointments: "/appointments",
    appointmentsCreate: "/appointments/create",
  },
};

export function formattedHours(date) {
  const options = { hour: "2-digit", minute: "2-digit" };

  return date.toLocaleTimeString([], options);
}
