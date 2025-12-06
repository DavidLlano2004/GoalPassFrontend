import { useQuery } from "@tanstack/react-query";
import { getInfoReportsAction } from "../actions";

export const useQueryReport = () => {
  const getInfoReportsQuery = useQuery({
    queryKey: ["info-reports"],
    queryFn: () => getInfoReportsAction(),
    staleTime: 1000 * 60 * 60,
  });

  return { getInfoReportsQuery };
};
