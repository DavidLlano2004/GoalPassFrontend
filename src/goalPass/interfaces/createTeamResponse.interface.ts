export interface CreateTeamResponse {
    team: Team;
}

export interface Team {
    created_at: Date;
    id:         string;
    name:       string;
    city:       string;
    stadium:    string;
    image_url:  null;
    foundation: string;
}
