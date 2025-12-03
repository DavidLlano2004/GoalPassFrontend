import { useQuery } from "@tanstack/react-query";
import { getTransactionDetailsAction } from "../actions";

export const useQueryTransaction = (matchId: string) => {
  const getTransactionDetailQuery = useQuery({
    queryKey: ["transaction-detail", matchId],
    queryFn: () => getTransactionDetailsAction(matchId),
    enabled: !!matchId,
  });

  return { getTransactionDetailQuery };
};
