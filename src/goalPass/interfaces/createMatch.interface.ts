export interface ResponseCreateMatch {
    match: Match;
}

export interface Match {
    created_at:      Date;
    id:              string;
    id_team_local:   string;
    id_team_visitor: string;
    match_date:      Date;
    match_hour:      string;
    state:           string;
    stadium:         string;
    updated_at:      null;
}
