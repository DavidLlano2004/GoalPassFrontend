import { apiGoalPass } from "../../api/goalPassApi";
import { sleep } from "../../helpers/sleep";
import type { ResponseGetInfoReports } from "../interfaces/getInfoReports";

export const getInfoReportsAction = async () => {
  await sleep(2000);
  try {
    const { data } = await apiGoalPass.get<ResponseGetInfoReports>("/reports");
    return data;
  } catch (error: any) {
    throw {
      message: "Error inesperado",
      error: error.response.data.message,
    };
  }
};
