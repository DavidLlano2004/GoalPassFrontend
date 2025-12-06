export interface ResponseGetHistoryPurchaseMatches {
    success: boolean;
    data:    Data;
}

export interface Data {
    user:                User;
    summary:             Summary;
    matches:             any[];
    stands_distribution: any[];
    message:             string;
}

export interface Summary {
    total_tickets:  number;
    total_matches:  number;
    total_spent:    number;
    favorite_stand: null;
    first_purchase: null;
    last_purchase:  null;
}

export interface User {
    id:    string;
    name:  string;
    email: string;
}
