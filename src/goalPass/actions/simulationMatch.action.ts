import { apiGoalPass } from "../../api/goalPassApi";
import { sleep } from "../../helpers/sleep";
import type { ResponseCreateSimulationMatch } from "../interfaces/createSimulation.interface";

export const createSimulationMatchAction = async (matchId: string) => {
  await sleep(2000);
  try {
    const { data } = await apiGoalPass.post<ResponseCreateSimulationMatch>(
      `/match-simulations/${matchId}/simulate`
    );
    return data;
  } catch (error: any) {
    throw {
      message: "Error inesperado",
      error: error.response.data.message,
    };
  }
};

export const getSimulationMatchAction = async (matchId: string) => {
  await sleep(2000);
  try {
    const { data } = await apiGoalPass.get<ResponseCreateSimulationMatch>(
      `/match-simulations/${matchId}/simulate`
    );
    return data;
  } catch (error: any) {
    throw {
      message: "Error inesperado",
      error: error.response.data.message,
    };
  }
};

