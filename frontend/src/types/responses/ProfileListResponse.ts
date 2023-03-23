import { Profile } from "../Profile"

export interface ProfileListResponse{
    "profiles":{
        data: Profile[];
        "count": number;
        "message": string;
    }
}