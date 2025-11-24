import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMeAction, updateMeAction } from "../actions/me.action";
import type { ResponseGetMe } from "../interfaces/getMe.interface";
import { useMutationLogout } from "../../auth/hooks/useMutationLogout.hooks";

export const useMutationMe = () => {
  const queryClient = useQueryClient();

  const updateMeMutation = useMutation({
    mutationFn: async (dataForm: any) => updateMeAction(dataForm),
    onSuccess: (data) => {
      queryClient.setQueryData<ResponseGetMe>(["me"], data);
    },
  });

  const deleteMeMutation = useMutation({
    mutationFn: async () => deleteMeAction(),
  });

  return { updateMeMutation , deleteMeMutation };
};
