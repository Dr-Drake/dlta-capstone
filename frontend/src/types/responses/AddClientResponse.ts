export interface AddClientResponse{
    addClient: {
        client: {
          id: string;
          email: string;
          password?: string;
          __typename?: string;
        },
        message?: string;
        __typename?: string;
    }
    
}