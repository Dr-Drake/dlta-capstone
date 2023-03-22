import React from 'react';

export interface CustomButtonProps extends 
React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
   variant?: 'outlined' | 'regular'
}

const CustomButton = React.forwardRef<HTMLButtonElement,CustomButtonProps>(({
    variant = 'regular', children, className,  ...props 
}, ref)=>{
    
    // Classes
    let regularClasses = "bg-buttonBlue text-white font-bold rounded-lg px-5 py-2.5 sm:px-5 sm:py-2";
    let outlinedClasses = 'text-white font-bold rounded-lg bg-transparent border-white border px-5 py-2.5 sm:px-5 sm:py-2';

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
        { children }
       </button>
    )
}) 

CustomButton.displayName = 'CustomButton';

export default CustomButton;