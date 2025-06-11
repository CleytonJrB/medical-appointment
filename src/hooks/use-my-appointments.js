import { useQuery } from "@tanstack/react-query";
import { useServiceRooms } from "./use-service-rooms";
import { useDoctors } from "./use-doctors";

import { queryKeys } from "../constantes";

import { getMyAppointments } from "../db/appointments.db";

//status - pending, confirmed, cancelled, completed

export const useMyAppointments = () => {
  const { data: doctorsList } = useDoctors();
  const { data: serviceRoomsList } = useServiceRooms();

  const { data, isLoading, refetch } = useQuery({
    queryKey: [queryKeys.appointments],
    queryFn: async () => await getMyAppointments(),
  });

  const appointmentsList = (data ?? [])
    .map((appointment) => {
      const doctor = (doctorsList ?? [])?.find(
        (doc) => doc?.id === appointment?.doctor
      );

      const serviceRoom = (serviceRoomsList ?? [])?.find(
        (room) => room?.id === appointment?.serviceRoomId
      );

      return {
        ...appointment,
        doctor: doctor ? doctor : appointment?.doctor,
        serviceRoom,
      };
    })
    .sort((a, b) => {
      const statusOrder = {
        confirmed: 0,
        pending: 1,
        cancelled: 2,
      };
      const aOrder = statusOrder[a.status] ?? 99;
      const bOrder = statusOrder[b.status] ?? 99;
      return aOrder - bOrder;
    });

  return {
    data: appointmentsList,
    loading: isLoading,
    refetch,
  };
};
