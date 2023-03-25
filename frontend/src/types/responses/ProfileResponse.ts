import { Profile } from "../Profile"

export interface ProfileResponse{
    "profile":{
        "profile": Profile;
        "message": string;
    }
}