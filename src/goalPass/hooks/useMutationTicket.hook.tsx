import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTicketAction } from "../actions";

interface dataForm {
  id_users: string;
  id_matches: string;
  id_match_stand_price: string;
  price: number;
  quantity: number;
  id_transaction: string;
}

export const useMutationTicket = () => {
  const queryClient = useQueryClient();
  const createTicketMutation = useMutation({
    mutationFn: async (dataForm: dataForm) => createTicketAction(dataForm),
    onSuccess: (data) => {
      queryClient.refetchQueries({ queryKey: ["myTickets"] });
      queryClient.refetchQueries({ queryKey: ["history-matches-purchase"] });
      queryClient.refetchQueries({
        queryKey: ["soccer-stands-summary", data?.ticket?.id_matches],
      });
      queryClient.refetchQueries({
        queryKey: ["ticketsByMatch", data?.ticket?.id_matches],
      });
    },
  });

  return { createTicketMutation };
};
