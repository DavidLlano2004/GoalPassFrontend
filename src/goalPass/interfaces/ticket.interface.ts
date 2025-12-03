export interface ResponseGetTicketsByMatch {
  message: string;
  response: Response;
}

export interface Response {
  match_id: string;
  total_capacity: number;
  tickets_sold: number;
  available_tickets: number;
  occupancy_percentage: number;
  lowest_price: number;
  status: string;
  available_percentage: number;
}
