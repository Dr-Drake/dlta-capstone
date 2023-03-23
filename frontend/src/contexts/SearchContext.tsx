import { Profile } from "@/types/Profile";
import React from "react";

export interface SearchContextProps{
    profiles: Profile[];
    setProfiles: (profiles: Profile[])=> void;
}

const SearchContext = React.createContext<SearchContextProps>({
   profiles:[],
   setProfiles: (p)=> console.log(p)
});

const { Provider } = SearchContext;

const SearchContextProvider: React.FC<any> = ({ children }) => {

    // State
    const [profiles, setProfiles] = React.useState<Profile[]>([]);

    return(
        <Provider value={{ profiles, setProfiles }}>
            { children }
        </Provider>
    )
}

export { SearchContext, SearchContextProvider }