import { useMutation } from "@tanstack/react-query";
import { registerAction } from "../actions/register.action";

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
  const registerMutation = useMutation({
    mutationFn: async (dataForm: registerProps) =>
      await registerAction(dataForm),
  });

  return {registerMutation};
};
