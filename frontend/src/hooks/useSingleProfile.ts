import { ProfileResponse } from "@/types/responses/ProfileResponse";
import { useQuery, gql } from "@apollo/client";

export const useSingleProfile = (id: string) =>{
   
    const QUERY = gql`
        query Client($profileId: ID!) {
            profile(id: $profileId) {
                message
                profile {
                    id
                    name
                    picture
                    role
                    bio
                    location
                    projects {
                        id
                        projectName
                        youtube
                        github
                        description
                        technologies
                    }
                }
            }
        }

    `;

    const { data, loading, error, refetch } = useQuery<ProfileResponse>(QUERY, {
        variables: { profileId: id }
    });

    return {
        data: data?.profile,
        isLoading: loading,
        error: error,
        refetch: refetch
    }
}