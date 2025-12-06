export interface ResponseCreateSimulationMatch {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  simulation: Simulation;
  events: Event[];
}

export interface Event {
  minute: number;
  type: Type;
  player: string;
  team: Team;
}

export const Team = {
  DeportivoPereira: "Deportivo Pereira",
  OnceCaldas: "Once Caldas",
} as const;

export type Team = (typeof Team)[keyof typeof Team];

export const Type = {
  Gol: "Gol",
  TarjetaAmarilla: "Tarjeta amarilla",
  TarjetaRoja: "Tarjeta roja",
} as const;

export type Type = (typeof Type)[keyof typeof Type];

export interface Simulation {
  id: string;
  local_team: Team;
  visitor_team: Team;
  score: string;
  match_state: string;
  stats: Stats;
}

export interface Stats {
  local: Local;
  visitor: Local;
}

export interface Local {
  goals: number;
  possession: string;
  shots_on_goal: number;
  yellow_cards: number;
  red_cards: number;
}
