export interface ClientInput{
    email: string;
    password?: string;
}

export interface Client extends ClientInput{
    id: string;
}