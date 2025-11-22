import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMatchAction } from "../actions";
import type { ResponseGetMatches } from "../interfaces";

interface PropsDataForm {
  id_team_local: string;
  id_team_visitor: string;
  match_date: Date;
  match_hour: string;
  state: string;
  stadium: string;
}

export const useMutationMatch = () => {
  const queryclient = useQueryClient();

  const createMatchMutation = useMutation({
    mutationFn: async (dataForm: PropsDataForm) => createMatchAction(dataForm),
    onSuccess: (data) => {
      queryclient.setQueryData<ResponseGetMatches>(["matches"], (old) => {
        if (!old) return { matches: [data?.match] };
        return { matches: [...old.matches, data!.match] };
      });
    },
  });

  return {createMatchMutation};
};
