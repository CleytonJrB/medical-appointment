import { useCurrentUser } from "./use-current-user";

export const useAppointments = () => {
  const user = useCurrentUser();

  const appointments = user?.appointments || [];

  return {
    data: appointments,
    loading: false,
  };
};
