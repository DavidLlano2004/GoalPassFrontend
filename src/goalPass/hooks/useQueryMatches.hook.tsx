import { useQuery } from "@tanstack/react-query";
import { getMatchAction, getMatchesAction } from "../actions";

export const useQueryMatches = (matchId?: string) => {
  const getMatchesQuery = useQuery({
    queryKey: ["matches"],
    queryFn: () => getMatchesAction(),
    staleTime: 1000 * 60 * 60,
  });
  const getMatchQuery = useQuery({
    queryKey: ["match", matchId],
    queryFn: () => getMatchAction(matchId!),
    staleTime: 1000 * 60 * 60,
    enabled: !!matchId,
  });

  return { getMatchesQuery , getMatchQuery };
};
