import { useQuery } from "@tanstack/react-query";

import { useHospital } from "./use-hospital";

import { getDoctors } from "../db/doctors.db";

import { queryKeys } from "../constantes";

import { generateHalfHourSlotsWithLunchBreak } from "../utils/doctor";

export const useDoctors = () => {
  const { data: hospitalDataList } = useHospital();

  const _hospitalData = hospitalDataList?.[0] || {};

  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.doctors],
    queryFn: async () => await getDoctors(),
  });

  const init = new Date(_hospitalData?.startDateAt ?? "2023-01-01T08:00:00");
  const end = new Date(_hospitalData?.endDateAt ?? "2023-01-01T18:00:00");

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
