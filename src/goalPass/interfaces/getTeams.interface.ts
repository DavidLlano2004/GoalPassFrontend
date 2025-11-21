export interface ResponseGetTeams {
    teams: Team[];
}

export interface Team {
    id:         string;
    name:       string;
    city:       string;
    stadium:    string;
    image_url:  null;
    foundation: string;
    created_at: Date;
}
