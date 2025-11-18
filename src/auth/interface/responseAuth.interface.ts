export interface ResponseAuth {
    token: string;
    user:  User;
}

export interface User {
    id:        string;
    email:     string;
    name:      string;
    last_name: string;
    rol:       string;
}
