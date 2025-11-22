import { useQuery } from "@tanstack/react-query";
import { getMatchesAction } from "../actions";

export const useQueryMatches = () => {
  const getMatchesQuery = useQuery({
    queryKey: ["matches"],
    queryFn: () => getMatchesAction(),
    staleTime: 1000 * 60 * 60,
  });

  return {getMatchesQuery};
};
