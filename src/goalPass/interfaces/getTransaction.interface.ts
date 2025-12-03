export interface ResponseGetTransactionDetails {
  message:  string;
  response: Response;
}

export interface Response {
  id:             string;
  total_amount:   string;
  number_tickets: number;
  match:          Match;
  ticket:         Ticket[];
}

export interface Match {
  id:              string;
  id_team_local:   string;
  id_team_visitor: string;
  match_date:      Date;
  match_hour:      string;
  stadium:         string;
  local:           Local;
  visitor:         Local;
}

export interface Local {
  id:        string;
  name:      string;
  image_url: string;
}

export interface Ticket {
  id:                   string;
  id_match_stand_price: string;
  price:                string;
  ticket_code:          string;
  msp:                  Msp;
}

export interface Msp {
  id:       string;
  price:    string;
  id_stand: string;
  stand:    Stand;
}

export interface Stand {
  id:   string;
  name: string;
}
