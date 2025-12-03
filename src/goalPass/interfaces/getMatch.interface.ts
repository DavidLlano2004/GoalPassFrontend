export interface ResponseGetMatch {
  match: Match;
}

export interface Match {
  id: string;
  id_team_local: string;
  id_team_visitor: string;
  match_date: Date;
  match_hour: string;
  state: string;
  stadium: string;
  created_at: Date;
  updated_at: null;
  local: Local;
  visitor: Local;
  stand_prices: ResponseStanda[];
}

export interface Local {
  id: string;
  name: string;
  city: string;
  stadium: string;
  image_url: string;
  foundation: string;
  created_at: Date;
}

export interface ResponseStanda {
  created_at: Date;
  id: string;
  id_match: string;
  id_stand: string;
  price: number;
  stand: Stand;
}

export interface Stand {
  id: string;
  name: string;
  total_capacity: number;
  description: string;
  created_at: Date;
}
