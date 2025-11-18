import axios from "axios";

const createAxiosClient = (baseURL: string) => {
  const axiosClient = axios.create({
    baseURL,
    withCredentials: true,
  });

  return axiosClient;
};

export const apiGoalPass = createAxiosClient(
  import.meta.env.VITE_API_APP
);
