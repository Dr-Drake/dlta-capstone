import React from "react";
import { FiSearch } from 'react-icons/fi';

export interface SearchBarProps extends 
React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
    containerClass?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
    containerClass, className, ...props 
})=>{

    // Classes
    let defaultClasses = 'border-0 bg-transparent text-base w-full p-1.5 outline-none flex-1';
    let defaultContainerClasses = "flex items-center border rounded-lg px-3 w-[70%]"

    return(
        <div className={`${defaultContainerClasses} ${containerClass}`}>
            <input 
                className={`${defaultClasses} ${className}`}
                {...props}
            />
            <FiSearch size={26}/>
        </div>
    )
}

export default SearchBar;