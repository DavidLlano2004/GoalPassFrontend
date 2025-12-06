import { useQuery } from "@tanstack/react-query";
import { getInfoDashboardAction } from "../actions/dashboard.actions";

export const useQueryDashboard = () => {

  const getInfoDashboardQuery = useQuery({
    queryKey: ["info-dashboard"],
    queryFn: () => getInfoDashboardAction(),
    staleTime: 1000 * 60 * 60,
  });

  return { getInfoDashboardQuery };
};
