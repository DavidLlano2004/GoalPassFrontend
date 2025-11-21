import axios from "axios";

const createAxiosClient = (baseURL: string) => {
  const axiosClient = axios.create({
    baseURL,
    withCredentials: true,
  });

  axiosClient.interceptors.request.use(
    (config) => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error al obtener el token:", error);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        console.error("No autorizado en respuesta");
        localStorage.clear();
      }
      return Promise.reject(error);
    }
  );

  return axiosClient;
};

export const apiGoalPass = createAxiosClient(import.meta.env.VITE_API_APP);
