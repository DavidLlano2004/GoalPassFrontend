import { apiGoalPass } from "../../api/goalPassApi";
import type { ResponseGetSoccerStandsSummary } from "../interfaces/getSoccerStandsSummary.interface";

export const getSoccerStandsSummaryAction = async (matchId: string) => {
  try {
    const { data } = await apiGoalPass.get<ResponseGetSoccerStandsSummary>(`/tickets/match/${matchId}/stands-summary`);
    return data;
  } catch (error: any) {
    throw {
      message: "Error inesperado",
      error: error.response.data.message,
    };
  }
};