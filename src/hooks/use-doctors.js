import { useQuery } from "@tanstack/react-query";

import { getDoctors } from "../db/doctors.db";

import { queryKeys } from "../constantes";

import { generateHalfHourSlotsWithLunchBreak } from "../utils/doctor";

export const useDoctors = () => {
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.doctors],
    queryFn: async () => await getDoctors(),
  });

  const init = new Date();
  init.setHours(8, 0, 0, 0);

  const end = new Date();
  end.setHours(17, 0, 0, 0);

  const doctorsWithHours = (data ?? []).map((doctor) => {
    const hours = generateHalfHourSlotsWithLunchBreak(init, end);

    return {
      ...doctor,
      hours,
    };
  });

  return {
    data: doctorsWithHours,
    loading: isLoading,
  };
};
