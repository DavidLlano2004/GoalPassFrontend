export interface ResponseGetInfodashboard {
    success: boolean;
    data:    Data;
}

export interface Data {
    dailyStats:      DailyStats;
    upcomingMatches: UpcomingMatches;
    standComparison: StandComparison[];
    salesTrend:      SalesTrend[];
    dailyRevenue:    DailyRevenue[];
    summary:         Summary;
}

export interface DailyRevenue {
    sale_date:          Date;
    daily_revenue:      number;
    transactions_count: number;
}

export interface DailyStats {
    ticketsSold:    number;
    revenue:        number;
    monthlyRevenue: number;
}

export interface SalesTrend {
    sale_date:     Date;
    day_name:      string;
    tickets_sold:  number;
    daily_revenue: number;
}

export interface StandComparison {
    stand_name:           string;
    total_capacity:       number;
    tickets_sold:         number;
    occupancy_percentage: number;
    occupancy_level:      string;
}

export interface Summary {
    active_matches:     number;
    total_stands:       number;
    total_tickets_sold: number;
    total_revenue:      number;
    avg_daily_sales:    number;
}

export interface UpcomingMatches {
    count:   number;
    matches: Match[];
}

export interface Match {
    match_id:             string;
    match_name:           string;
    formatted_date:       string;
    match_hour:           string;
    stadium:              string;
    total_capacity:       number;
    tickets_sold:         number;
    occupancy_percentage: number;
    occupancy_level:      string;
}
