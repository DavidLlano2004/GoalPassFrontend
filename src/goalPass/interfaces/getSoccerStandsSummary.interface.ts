export interface ResponseGetSoccerStandsSummary {
  success: boolean;
  response: Response;
}

export interface Response {
  match_id: string;
  totals: Totals;
  stands: Stand[];
}

export interface Stand {
  stand_id: string;
  stand_name: string;
  description: string;
  total_capacity: number;
  price: number;
  tickets_sold: number;
  tickets_available: number;
  occupancy_percentage: number;
  revenue: number;
  availability: string;
}

export interface Totals {
  total_capacity: number;
  tickets_sold: number;
  available_tickets: number;
  occupancy_percentage: number;
  total_revenue: number;
}
