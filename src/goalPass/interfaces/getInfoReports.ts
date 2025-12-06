export interface ResponseGetInfoReports {
    success: boolean;
    data:    Data;
}

export interface Data {
    totalStats:     TotalStats;
    revenueByDay:   RevenueByDay[];
    revenueByStand: RevenueByStand[];
    topMatches:     MatchesDetail[];
    matchesDetails: MatchesDetail[];
    ticketsByStand: TicketsByStand[];
}

export interface MatchesDetail {
    match_id?:            string;
    match_name:           string;
    tickets_sold:         number;
    match_revenue:        number;
    match_capacity:       number;
    occupancy_percentage: number;
}

export interface RevenueByDay {
    sale_date:          Date;
    daily_revenue:      number;
    transactions_count: number;
}

export interface RevenueByStand {
    stand_name:    string;
    tickets_sold:  number;
    stand_revenue: number;
}

export interface TicketsByStand {
    stand_name:   string;
    ticket_count: number;
    percentage:   string;
}

export interface TotalStats {
    totalRevenue:             number;
    totalTicketsSold:         number;
    totalCapacity:            number;
    totalOccupancyPercentage: number;
    mostPopularStand:         string;
}
