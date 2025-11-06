import { axiosApiTeamApp } from "./apiTeams";

interface Team {
  strBadge: string;
  strTeam: string;
  strLocation: string;
  strStadium: string;
  intFormedYear: string;
}

export const getTeamsByApiAction = async () => {
  try {
    const { data } = await axiosApiTeamApp.get(
      "/search_all_teams.php?l=Colombia_Categoría_Primera_A"
    );

    const endTeams = data?.teams.map(
      ({
        strTeam,
        strLocation,
        strStadium,
        intFormedYear,
        strBadge,
      }: Team) => ({
        strBadge,
        strTeam,
        strLocation,
        strStadium,
        intFormedYear,
      })
    );

    const dataOnceCaldas = {
      strTeam: "Once Caldas",
      strLocation: "Manizales , Colombia",
      strStadium: "Estadio Palogrande",
      intFormedYear: "1961",
      strBadge: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Once_Caldas_logo-svg.svg/248px-Once_Caldas_logo-svg.svg.png",
    };

    endTeams.unshift(dataOnceCaldas)

    return endTeams;
  } catch (error: any) {
    throw (
      error.response?.data || {
        message: "Error inesperado al traer los equipos",
        error,
      }
    );
  }
};
