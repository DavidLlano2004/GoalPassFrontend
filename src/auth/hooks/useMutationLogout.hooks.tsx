import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "../../redux/hooks/reduxHooks";
import { singOffCase } from "../../redux/slices/auth.slice";
import { useNavigate } from "react-router";
import { paths } from "../../routes/paths";
import { sleep } from "../../helpers/sleep";

export const useMutationLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await sleep(1000);
    },
    onSuccess: async () => {
       try {
        await queryClient.clear();

        dispatch({ type: "RESET_STATE" });
        dispatch(singOffCase());
        navigate(paths.AuthLayout);
      } catch (error) {
        console.error("Error limpiando la sesión:", error);
      }
    },
  });
  return { logoutMutation };
};
