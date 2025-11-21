import { apiGoalPass } from "../../api/goalPassApi";
import { sleep } from "../../helpers/sleep";
import type { CreateTeamResponse, ResponseDeleteTeam, ResponseGetTeams } from "../interfaces";

interface Props {
  name: string;
  city: string;
  stadium: string;
  image_url: string;
  foundation: string;
}

export const createTeamAction = async (dataForm: Props) => {
  await sleep(2000);
  try {
    const { data } = await apiGoalPass.post<CreateTeamResponse>(
      "/teams/",
      dataForm
    );
    return data;
  } catch (error: any) {
    throw {
      message: "Error inesperado",
      error: error.response.data.message,
    };
  }
};

export const getAllTeamsAction = async () => {
  try {
    const { data } = await apiGoalPass.get<ResponseGetTeams>("/teams/");
    return data;
  } catch (error: any) {
    throw {
      message: "Error inesperado",
      error: error.response.data.message,
    };
  }
};

export const deleteTeamAction = async (teamId: string) => {
  console.log("====================================");
  console.log(teamId);
  console.log("====================================");
  await sleep(2000);
  try {
    const { data } = await apiGoalPass.delete<ResponseDeleteTeam>(
      `/teams/${teamId}`
    );
    return data;
  } catch (error: any) {
    throw {
      message: "Error inesperado",
      error: error.response.data.message,
    };
  }
};
