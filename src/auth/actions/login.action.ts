import { apiGoalPass } from "../../api/goalPassApi";
import { sleep } from "../../helpers/sleep";
import type { ResponseAuth } from "../interface/responseAuth.interface";

interface PropsDataForm {
  email: string;
  password: string;
}

export const loginAction = async (dataform: PropsDataForm) => {
  await sleep(2000);
  const { email, password } = dataform;

  const newData = {
    email: email.toLowerCase(),
    password,
  };

  try {
    const { data } = await apiGoalPass.post<ResponseAuth>(
      "/auth/login",
      newData
    );
    return data;
  } catch (error: any) {
    throw {
      message: "Error inesperado",
      error: error.response.data.message,
    };
  }
};
