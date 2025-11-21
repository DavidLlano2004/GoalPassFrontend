import { useQuery } from "@tanstack/react-query";
import { getUsersAction } from "../actions/user.actions";

export const useQueryUsers = () => {
  const getUsersQuery = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsersAction(),
    staleTime: 1000 * 60 * 60,
  });

  return { getUsersQuery };
};
