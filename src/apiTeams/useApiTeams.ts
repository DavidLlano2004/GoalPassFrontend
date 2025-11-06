import { useQuery } from "@tanstack/react-query";
import { getTeamsByApiAction } from "./actionApiTeams";

export const useApiTeams = () => {
  const getTeamsByApiQuery = useQuery({
    queryKey: ["teams-by-api"],
    queryFn: () => getTeamsByApiAction(),
    staleTime: 1000 * 60 * 60,
  });

  return { getTeamsByApiQuery };
};
