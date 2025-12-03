export interface ResponseGetMyTickets {
  success: boolean;
  tickets: Ticket[];
}

export interface Ticket {
  id:                   string;
  id_users:             string;
  id_matches:           string;
  id_match_stand_price: string;
  ticket_code:          string;
  price:                string;
  state:                string;
  seat_info:            string;
  purchased_at:         Date;
  match:                Match;
  msp:                  Msp;
}

export interface Match {
  id:              string;
  id_team_local:   string;
  id_team_visitor: string;
  match_date:      Date;
  match_hour:      string;
  state:           string;
  stadium:         string;
  created_at:      Date;
  updated_at:      null;
  local:           Local;
  visitor:         Local;
}

export interface Local {
  id:         string;
  name:       string;
  city:       string;
  stadium:    string;
  image_url:  string;
  foundation: string;
  created_at: Date;
}

export interface Msp {
  id:         string;
  id_match:   string;
  id_stand:   string;
  price:      string;
  created_at: Date;
  stand:      Stand;
}

export interface Stand {
  id:             string;
  name:           string;
  total_capacity: number;
  description:    string;
}