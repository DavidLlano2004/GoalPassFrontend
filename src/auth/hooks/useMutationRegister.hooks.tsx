import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerAction } from "../actions/register.action";
import type { ResponseGetUsers } from "../../goalPass/interfaces/getUsers.interface";

interface registerProps {
  name: string;
  last_name: string;
  identification: string;
  identification_type: string;
  email: string;
  password: string;
  address: string;
}

export const useMutationRegister = () => {
  const queryclient = useQueryClient();
  const registerMutation = useMutation({
    mutationFn: async (dataForm: registerProps) =>
      await registerAction(dataForm),
    onSuccess: (data) => {
      queryclient.setQueryData<ResponseGetUsers[]>(["users"], (old) => {
        if (!old) return { users: [data?.user] };
        return { users: [...old.users, data!.user] };
      });
    },
  });

  return { registerMutation };
};
