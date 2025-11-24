import { useQuery } from "@tanstack/react-query";
import { getMeAction } from "../actions/me.action";

export const useQueryMe = () => {
  const getMeQuery = useQuery({
    queryKey: ["me"],
    queryFn: () => getMeAction(),
    staleTime: 1000 * 60 * 60,
  });
  return {getMeQuery};
};
