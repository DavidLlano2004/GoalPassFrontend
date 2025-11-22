import { apiGoalPass } from "../../api/goalPassApi";
import { sleep } from "../../helpers/sleep";
import type { ResponseCreateMatch } from "../interfaces/createMatch.interface";
import type { ResponseGetMatches } from "../interfaces/getMatches.interfacce";

interface PropsDataForm {
  id_team_local: string;
  id_team_visitor: string;
  match_date: Date;
  match_hour: string;
  state: string;
  stadium: string;
}

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
