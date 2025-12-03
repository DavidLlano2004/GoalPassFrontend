import { apiGoalPass } from "../../api/goalPassApi";
import { sleep } from "../../helpers/sleep";
import type { ResponseDeleteMe } from "../interfaces/deleteMe.interface";
import type { ResponseGetMe } from "../interfaces/getMe.interface";
import type { ResponseGetMyTickets } from "../interfaces/getMyTickets.interface";

export const getMeAction = async () => {
  await sleep(2000);
  try {
    const { data } = await apiGoalPass.get<ResponseGetMe>(`/users/me`);
    return data;
  } catch (error: any) {
    throw {
      message: "Error inesperado",
      error: error.response.data.message,
    };
  }
};

export const updateMeAction = async (dataForm:any) => {
  
  await sleep(2000);
  try {
    const { data } = await apiGoalPass.put<ResponseGetMe>(`/users/me` , dataForm);
    return data;
  } catch (error: any) {
    throw {
      message: "Error inesperado",
      error: error.response.data.message,
    };
  }
};

export const deleteMeAction = async () => {
  await sleep(2000);
  try {
    const { data } = await apiGoalPass.delete<ResponseDeleteMe>(`/users/me`);
    return data;
  } catch (error: any) {
    throw {
      message: "Error inesperado",
      error: error.response.data.message,
    };
  }
};




export const getMyTicketsAction = async () => {
  await sleep(2000);
  try {
    const { data } = await apiGoalPass.get<ResponseGetMyTickets>(`/tickets/me`);
    return data;
  } catch (error: any) {
    throw {
      success: false,
      message: "Server error",
      error: error.response.data.message,
    };
  }
};
