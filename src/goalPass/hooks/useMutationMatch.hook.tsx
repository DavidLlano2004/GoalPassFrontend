import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  editMatchAction,
  createMatchAction,
  deleteMatchAction,
} from "../actions";
import type { ResponseGetMatch, ResponseGetMatches } from "../interfaces";

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

  const deleteMatchMutation = useMutation({
    mutationFn: async (matchId: string) => deleteMatchAction(matchId),
    onSuccess: (_, matchId) => {
      queryclient.setQueryData<ResponseGetMatches>(["matches"], (old) => {
        if (!old) return { matches: [] };
        return {
          matches: old?.matches?.filter((team) => team.id != matchId) || [],
        };
      });
    },
  });

  const editMatchMutation = useMutation({
    mutationFn: async ({ dataForm, matchId }: any) => editMatchAction(dataForm , matchId),
    onSuccess: (data) => {
      queryclient.setQueryData<ResponseGetMatch>(
        ["match", data.match.id],
        data
      );
      queryclient.setQueryData<{ matches: ResponseGetMatches[] }>(
        ["matches"],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            matches: oldData.matches.map((match) =>
              match.id === data.match.id ? data.match : match
            ),
          };
        }
      );
    },
  });

  return { createMatchMutation, deleteMatchMutation, editMatchMutation };
};
