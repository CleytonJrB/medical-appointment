import { useQuery } from "@tanstack/react-query";

import { useDoctors } from "./use-doctors";
import { queryKeys } from "../constantes";
import { getMyAppointments } from "../db/appointments.db";

export const useMyAppointments = () => {
  const doctors = useDoctors();

  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.appointments],
    queryFn: async () => await getMyAppointments(),
  });

  const appointmentsWithDoctors = (data ?? []).map((appointment) => {
    const doctor = doctors.data.find((doc) => doc.id === appointment.doctor);

    return {
      ...appointment,
      doctor: doctor ? doctor : appointment.doctor,
    };
  });

  return {
    data: appointmentsWithDoctors,
    loading: isLoading,
  };
};
