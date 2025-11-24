import { apiGoalPass } from "../../api/goalPassApi";
import { sleep } from "../../helpers/sleep";
import type {
  ResponseCreateMatch,
  ResponseDeleteMatch,
  ResponseGetMatch,
  ResponseGetMatches,
} from "../interfaces";

interface PropsDataForm {
  id_team_local: string;
  id_team_visitor: string;
  match_date: Date;
  match_hour: string;
  state: string;
  stadium: string;
}

export const createMatchAction = async (dataForm: PropsDataForm) => {
  await sleep(2000);
  try {
    const { data } = await apiGoalPass.post<ResponseCreateMatch>(
      "/matches",
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

export const getMatchesAction = async () => {
  await sleep(2000);
  try {
    const { data } = await apiGoalPass.get<ResponseGetMatches>("/matches");
    return data;
  } catch (error: any) {
    throw {
      message: "Error inesperado",
      error: error.response.data.message,
    };
  }
};

export const getMatchAction = async (matchId: string) => {
  await sleep(2000);
  try {
    const { data } = await apiGoalPass.get<ResponseGetMatch>(
      `/matches/${matchId}`
    );
    return data;
  } catch (error: any) {
    throw {
      message: "Error inesperado",
      error: error.response.data.message,
    };
  }
};

export const deleteMatchAction = async (matchId: string) => {
  await sleep(2000);
  try {
    const { data } = await apiGoalPass.delete<ResponseDeleteMatch>(
      `/matches/${matchId}`
    );
    return data;
  } catch (error: any) {
    throw {
      message: "Error inesperado",
      error: error.response.data.message,
    };
  }
};

export const editMatchAction = async (dataForm: any, matchId: string) => {
  await sleep(2000);
  try {
    const { data } = await apiGoalPass.put<ResponseGetMatch>(
      `/matches/${matchId}`,
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
