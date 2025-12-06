import { useQuery } from "@tanstack/react-query";
import {
  getHistoryMatchesAction,
  getHistoryPurchaseMatchesAction,
  getMatchAction,
  getMatchesAction,
} from "../actions";
import { useAppSelector } from "../../redux/hooks/reduxHooks";

export const useQueryMatches = (matchId?: string) => {
  const { rol } = useAppSelector((state) => state.auth);

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

  const getHistoryMatchesQuery = useQuery({
    queryKey: ["history-matches"],
    queryFn: () => getHistoryMatchesAction(),
    staleTime: 1000 * 60 * 60,
    enabled:rol === "administrador",
  });
  const getHistoryPurchaseMatchesQuery = useQuery({
    queryKey: ["history-matches-purchase"],
    queryFn: () => getHistoryPurchaseMatchesAction(),
    staleTime: 1000 * 60 * 60,
    enabled:rol === "usuario",

  });

  return { getMatchesQuery, getMatchQuery, getHistoryMatchesQuery , getHistoryPurchaseMatchesQuery };
};
