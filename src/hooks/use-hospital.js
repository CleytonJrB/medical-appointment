import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "../constantes";

import { getHospital } from "../db/hospital.db";

//status - active, inactive

export const useHospital = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: [queryKeys.hospital],
    queryFn: async () => await getHospital(),
  });

  const _data = (data ?? []).map((item) => ({
    ...item,
    startDateAt: new Date(item.startDateAt),
    endDateAt: new Date(item.endDateAt),
  }));

  return {
    data: _data,
    loading: isLoading,
    refetch,
  };
};
