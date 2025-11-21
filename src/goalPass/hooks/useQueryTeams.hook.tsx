import { useQuery } from "@tanstack/react-query";
import { getAllTeamsAction } from "../actions";

export const useQueryTeams = () => {
  const getTeamsQuery = useQuery({
    queryKey: ["teams"],
    queryFn: () => getAllTeamsAction(),
    staleTime: 1000 * 60 * 60,
  });

  return { getTeamsQuery };
};
