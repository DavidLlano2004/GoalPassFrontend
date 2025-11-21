import { apiGoalPass } from "../../api/goalPassApi";
import { sleep } from "../../helpers/sleep";
import type { ResponseAuth } from "../interface";

interface Props {
  name: string;
  last_name: string;
  identification: string;
  identification_type: string;
  email: string;
  password: string;
  address: string;
}

export const registerAction = async (dataForm: Props) => {
  await sleep(2000);
  console.log(dataForm);
  

  try {
    const { data } = await apiGoalPass.post<ResponseAuth>("/auth/register/" , dataForm);
    return data;
  } catch (error: any) {
    throw {
      message: "Error inesperado",
      error: error.response.data.message,
    };
  }
};
