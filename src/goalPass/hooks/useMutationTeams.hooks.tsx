import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTeamAction, deleteTeamAction } from "../actions";
import type { ResponseGetTeams } from "../interfaces";

interface PropsDataForm {
  name: string;
  city: string;
  stadium: string;
  image_url: string;
  foundation: string;
}

export const useMutationTeams = () => {
  const queryclient = useQueryClient();

  const createTeamMutation = useMutation({
    mutationFn: async (dataForm: PropsDataForm) =>
      await createTeamAction(dataForm),
    onSuccess: (data) => {
      queryclient.setQueryData<ResponseGetTeams>(["teams"], (old) => {
        if (!old) return { teams: [data?.team] };
        return { teams: [...old.teams, data!.team] };
      });
    },
  });

  const deleteTeamMutation = useMutation({
    mutationFn: async (teamId: string) => await deleteTeamAction(teamId),
    onSuccess: (_, teamId) => {
      queryclient.setQueryData<ResponseGetTeams>(["teams"], (old) => {
        if (!old) return { teams: [] };
        return { teams: old?.teams?.filter((team) => team.id != teamId) || [] };
      });
    },
  });

  return { createTeamMutation , deleteTeamMutation };
};
