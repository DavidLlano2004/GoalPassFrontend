import { useQuery } from "@tanstack/react-query";
import {
  getMyTicketsAction,
  getTicketsAvailableByMatchAction,
} from "../actions";
export const useQueryTickets = (matchId: string) => {
  const getTicketsByMatchQuery = useQuery({
    queryKey: ["ticketsByMatch", matchId],
    queryFn: () => getTicketsAvailableByMatchAction(matchId),
    enabled: !!matchId,
  });

  const getMyTickets = useQuery({
    queryKey: ["myTickets"],
    queryFn: () => getMyTicketsAction(),
    staleTime: 1000 * 60 * 60,
  });

  return { getTicketsByMatchQuery, getMyTickets };
};
