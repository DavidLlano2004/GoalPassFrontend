import { useQuery } from "@tanstack/react-query";
import { getSoccerStandsSummaryAction } from "../actions";

export const useQuerySoccerStands = (matchId: string) => {
  const getSoccerStandsSummary = useQuery({
    queryKey: ["soccer-stands-summary", matchId],
    queryFn: () => getSoccerStandsSummaryAction(matchId),
    enabled: !!matchId,
  });

  return { getSoccerStandsSummary };
};
