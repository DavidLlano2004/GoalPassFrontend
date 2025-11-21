import { apiGoalPass } from "../../api/goalPassApi";
import { sleep } from "../../helpers/sleep";
import type { ResponseDeleteUser, ResponseGetUsers, ResponseUpdateUser } from "../interfaces";

export const getUsersAction = async () => {
  await sleep(2000);
  try {
    const { data } = await apiGoalPass.get<ResponseGetUsers>("/users");
    return data;
  } catch (error: any) {
    throw {
      message: "Error inesperado",
      error: error.response.data.message,
    };
  }
};

export const deleteUserAction = async (userId: string) => {
  await sleep(2000);
  try {
    const { data } = await apiGoalPass.delete<ResponseDeleteUser>(
      `/users/${userId}`
    );
    return data;
  } catch (error: any) {
    throw {
      message: "Error inesperado",
      error: error.response.data.message,
    };
  }
};

interface PropsDataForm {
  id?: string;
  email?: string;
  name?: string;
  last_name?: string;
  identification?: string;
  identification_type?: string;
  rol?: string;
  birthday?: string;
  address?: string;
}

export const updateUserAction = async (
  dataForm: PropsDataForm,
  userId: string
) => {
  await sleep(2000);
  try {
    const { data } = await apiGoalPass.put<ResponseUpdateUser>(
      `/users/${userId}`,
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
