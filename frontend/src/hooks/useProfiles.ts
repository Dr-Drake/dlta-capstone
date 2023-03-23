import { ProfileListResponse } from "@/types/responses/ProfileListResponse";
import { useQuery, gql } from "@apollo/client";

export const useProfiles = () =>{
   
    const QUERY = gql`
        query Client {
            profiles {
                data {
                    id
                    name
                    picture
                    role
                    bio
                    location
                }
                count
                message
            }
        }

    `;

    const { data, loading, error, refetch } = useQuery<ProfileListResponse>(QUERY);

    return {
        data: data?.profiles,
        isLoading: loading,
        error: error,
        refetch: refetch
    }
}