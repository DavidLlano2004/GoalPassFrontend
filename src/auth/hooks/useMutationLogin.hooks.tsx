import { useMutation } from "@tanstack/react-query";
import { loginAction } from "../actions";
import { useAppDispatch } from "../../redux/hooks/reduxHooks";
import { loginCase } from "../../redux/slices/auth.slice";

interface PropsDataForm {
  email: string;
  password: string;
}

export const useMutationLogin = () => {
  const dispatch = useAppDispatch();

  const loginMutation = useMutation({
    mutationFn: async (dataForm: PropsDataForm) => loginAction(dataForm),
    onSuccess: (data) => {
      dispatch(
        loginCase({
          id: data?.user?.id,
          rol: data?.user?.rol,
          email: data?.user?.email,
          name: data?.user?.name
        })
      );
    },
  });
  return { loginMutation };
};
