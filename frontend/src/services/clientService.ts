import apolloClient from "@/config/apollo-client";
import { Client, ClientInput } from "@/types/Client";
import { AddClientResponse } from "@/types/responses/AddClientResponse";
import { GetClientResponse } from "@/types/responses/GetClientResponse";
import { gql } from "@apollo/client";

export interface ServiceResult<T = any, E = any>{
    data?: T;
    error?: E;
}


export async function getClient(clientInput: ClientInput) {

    const QUERY = gql`
        query Client($client: ClientInput) {
            client(client: $client) {
                client {
                    id
                    email
                    password
                }
                message
            }
        } 
    `;

    const willGetClient = new Promise<ServiceResult<GetClientResponse>>((resolve)=>{
        apolloClient.query<any>({ 
            query: QUERY,
            variables: { client: clientInput } 
        })
        .then((res)=>{
            resolve({
                data: res.data
            })
        })
        .catch((e)=>{
            resolve({
                error: e
            })
        })
    })

    return willGetClient;
}

export async function createClient(clientInput: ClientInput) {

    const MUTATION = gql`
        mutation AddClient($client: ClientInput) {
            addClient(client: $client) {
                client {
                    id
                    email
                    password
                }
                message
            }
        }
    `;

    const willCreateClient = new Promise<ServiceResult<AddClientResponse>>((resolve)=>{
        apolloClient.mutate<any>({ 
            mutation: MUTATION,
            variables: { client: clientInput } 
        })
        .then((res)=>{
            resolve({
                data: res.data
            })
        })
        .catch((e)=>{
            resolve({
                error: e
            })
        })
    })

    return willCreateClient;
}