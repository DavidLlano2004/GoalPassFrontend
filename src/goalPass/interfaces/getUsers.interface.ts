export interface ResponseGetUsers {
    users: User[];
}

export interface User {
    id:                  string;
    email:               string;
    name:                string;
    last_name:           string;
    identification:      string;
    identification_type: string;
    rol:                 string;
    birthday:            Date;
    address:             string;
    created_at:          Date;
    updated_at:          null;
}
