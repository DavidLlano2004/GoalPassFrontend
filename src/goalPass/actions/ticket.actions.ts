import { apiGoalPass } from "../../api/goalPassApi";
import { sleep } from "../../helpers/sleep";
import type { ResponseGetTicketsByMatch } from "../interfaces";

export const getTicketsAvailableByMatchAction = async (matchId: string) => {
  await sleep(2000);
  try {
    const { data } = await apiGoalPass.get<ResponseGetTicketsByMatch>(
      `/tickets/match/${matchId}`
    );
    return data;
  } catch (error: any) {
    throw {
      message: "Error inesperado",
      error: error.response.data.message,
    };
  }
};

interface ResponseCreateTicket {
  success: boolean;
  ticket: Ticket;
}

interface Ticket {
  id_users: string;
  id_matches: string;
  id_match_stand_price: string;
  price: number;
  quantity: number;
}

export const createTicketAction = async (dataForm: Ticket) => {
  const newDataForm = {
    ...dataForm,
    state: "vendido",
  };
  await sleep(2000);
  try {
    const { data } = await apiGoalPass.post<ResponseCreateTicket>(
      "/tickets",
      newDataForm
    );
    return data;
  } catch (error: any) {
    throw {
      message: "Error inesperado",
      error: error.response.data.message,
    };
  }
};
