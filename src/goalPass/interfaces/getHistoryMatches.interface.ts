export interface ResponseHistoryMatches {
  success: boolean;
  summary: Summary;
  matches: Match[];
}

export interface Match {
  id: string;
  match_date: Date;
  match_hour: string;
  stadium: string;
  state: string;
  total_tickets_sold: number;
  total_revenue: number;
  local: Local;
  visitor: Local;
  result: Result;
}

export interface Local {
  id: string;
  name: string;
  image_url: string;
}

export interface Summary {
  total_matches: number;
  total_tickets_sold: number;
  total_revenue: number;
  average_tickets_per_match: number;
  average_revenue_per_match: number;
}

export interface Result {
  id: string;
  local_goals: number;
  visitor_goals: number;
}
