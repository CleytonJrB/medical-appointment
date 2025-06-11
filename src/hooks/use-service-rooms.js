import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "../constantes";

import { getServiceRooms } from "../db/serviceRooms.db";
import { useAppointments } from "./use-appointments";

//status - active, inactive

export const useServiceRooms = () => {
  const { data: appointmentList } = useAppointments();

  const { data, isLoading, refetch } = useQuery({
    queryKey: [queryKeys.serviceRooms],
    queryFn: async () => await getServiceRooms(),
  });

  const serviceRooms = (data ?? [])
    .map((room) => {
      const appointments = (appointmentList ?? [])?.filter(
        (appointment) => appointment?.serviceRoomId === room?.id
      );

      return {
        ...room,
        appointments: appointments ?? [],
      };
    })
    .sort((a, b) => {
      if (a.status === "active" && b.status !== "active") return -1;
      if (a.status !== "active" && b.status === "active") return 1;
      return 0;
    });

  return {
    data: serviceRooms,
    loading: isLoading,
    refetch,
  };
};
