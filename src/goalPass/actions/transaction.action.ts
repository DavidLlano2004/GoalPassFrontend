import { apiGoalPass } from "../../api/goalPassApi";
import { sleep } from "../../helpers/sleep";
import type { ResponseGetTransactionDetails } from "../interfaces/getTransaction.interface";

export interface ResponseCreateTransaction {
  transaction: Transaction;
}

export interface Transaction {
  created_at: Date;
  id: string;
  id_users: string;
  id_matches: string;
  total_amount: string;
  number_tickets: number;
  payment_method: string;
  reference: null;
  currency: string;
}

export interface PropsCreateTransaction {
  id_users: string;
  id_matches: string;
  total_amount: number;
  number_tickets: number;
}

export const createTransactionAction = async (
  dataForm: PropsCreateTransaction
) => {
  const newDataForm = {
    ...dataForm,
    payment_method: "CREDIT_CARD",
  };
  await sleep(2000);
  try {
    const { data } = await apiGoalPass.post<ResponseCreateTransaction>(
      "/transactions",
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

export const getTransactionDetailsAction = async (matchId: string) => {
  await sleep(2000);
  try {
    const { data } = await apiGoalPass.get<ResponseGetTransactionDetails>(
      `/transactions/details/${matchId}`
    );
    return data;
  } catch (error: any) {
    throw {
      message: "Error inesperado",
      error: error.response.data.message,
    };
  }
};
