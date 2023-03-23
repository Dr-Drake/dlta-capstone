import React from "react";

export interface CustomSkeletonProps{
    isLoading?: boolean;
    children?: React.ReactNode;
}

const CustomSkeleton: React.FC<CustomSkeletonProps> = ({ children, isLoading })=>{

    // Variables
    const loadingClasses = "skeleton [&>*]:opacity-0";

    return(
        <div className={isLoading ? loadingClasses : undefined}>
            { children }
        </div>
    )
}

export default CustomSkeleton