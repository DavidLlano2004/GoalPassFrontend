import { useMutation, useQuery } from "@tanstack/react-query";
import { getSimulationMatchAction } from "../actions";

export const useQuerySimulation = (matchId: string) => {
  const getSimulationMatchQuery = useQuery({
    queryKey: ["simulation-match", matchId],
    queryFn: () => getSimulationMatchAction(matchId),
    enabled: !!matchId,
    staleTime: 1000 * 60 * 60,
  });

  return { getSimulationMatchQuery };
};
