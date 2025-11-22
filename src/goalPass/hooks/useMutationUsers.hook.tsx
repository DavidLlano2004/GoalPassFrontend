import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserAction, updateUserAction } from "../actions";
import type { ResponseGetUsers } from "../interfaces";

export const useMutationUsers = () => {
  const queryclient = useQueryClient();

  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => await deleteUserAction(userId),
    onSuccess: (_, userId) => {
      queryclient.setQueryData<ResponseGetUsers>(["users"], (old) => {
        if (!old) return { users: [] };
        return { users: old?.users?.filter((user) => user.id != userId) || [] };
      });
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: async ({
      dataForm,
      userId,
    }: {
      dataForm: any;
      userId: string;
    }) => await updateUserAction(dataForm, userId),
    onSuccess: (updatedUser) => {
      queryclient.setQueryData<{ users: ResponseGetUsers[] }>(["users"], (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          users: oldData.users.map((user) =>
            user.id === updatedUser.user.id ? updatedUser.user : user
          ),
        };
      });
    },
  });

  return { deleteUserMutation, updateUserMutation };
};
