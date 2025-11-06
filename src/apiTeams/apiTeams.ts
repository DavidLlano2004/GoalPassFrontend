import axios from "axios";

const createAxiosApiTeams = (baseURL: any) => {
  const axiosApiTeam = axios.create({
    baseURL,
  });

  return axiosApiTeam;
};

export const axiosApiTeamApp = createAxiosApiTeams(
  import.meta.env.VITE_API_TEAMS
);
