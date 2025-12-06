import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSimulationMatchAction } from "../actions";

export const useMutationSimulation = () => {
  const queryClient = useQueryClient();
  const createSimulationMatchMutation = useMutation({
    mutationFn: async (matchId: string) =>
      await createSimulationMatchAction(matchId),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["matches"] });
      queryClient.refetchQueries({ queryKey: ["history-matches"] });
    },
  });

  return { createSimulationMatchMutation };
};
