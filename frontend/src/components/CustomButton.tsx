import React from 'react';
import { CgSpinner } from "react-icons/cg";

export interface CustomButtonProps extends 
React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
   variant?: 'outlined' | 'regular';
   loading?: boolean;
}

const CustomButton = React.forwardRef<HTMLButtonElement,CustomButtonProps>(({
    variant = 'regular', loading, children, className,  ...props 
}, ref)=>{
    
    // Classes
    let regularClasses = "flex items-center justify-center bg-buttonBlue text-white font-bold rounded-lg px-5 py-2.5 sm:px-5 sm:py-2";
    let outlinedClasses = 'flex items-center justify-center text-white font-bold rounded-lg bg-transparent border-white border px-5 py-2.5 sm:px-5 sm:py-2';

    // Helpers
    const getVariantStyle = ()=>{
        switch (variant) {
            case 'regular':
                return regularClasses

            case 'outlined':
                return outlinedClasses
        }
    }

    return(
        <button className={`${getVariantStyle()} ${className}`} ref={ref} {...props}>
            { 
                loading &&
                <CgSpinner className='animate-spin mr-2' size={20}/>
            }
            { children }
        </button>
    )
}) 

CustomButton.displayName = 'CustomButton';

export default CustomButton;