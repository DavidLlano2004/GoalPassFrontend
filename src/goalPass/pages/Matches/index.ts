export interface Response {
    stands: Stand[];
}

export interface Stand {
    stand_id:             string;
    stand_name:           string;
    description:          string;
    total_capacity:       number;
    price:                number;
    tickets_sold:         number;
    tickets_available:    number;
    occupancy_percentage: number;
    revenue:              number;
    availability:         string;
}
