import { useMutation } from "@tanstack/react-query";
import {
  createTransactionAction,
  type PropsCreateTransaction,
} from "../actions";

export const useMutationTransaction = () => {
  const createTransactionMutation = useMutation({
    mutationFn: async (dataForm: PropsCreateTransaction) =>
      createTransactionAction(dataForm),
  });

  return { createTransactionMutation };
};
