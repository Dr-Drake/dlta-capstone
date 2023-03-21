import React from 'react';

export interface OAuthButtonProps{
    icon?: React.ReactNode;
    label?: string;
    onClick?: ()=> void;
    className?: string;
}

const OAuthButton: React.FC<OAuthButtonProps> = ({
    icon, label, onClick, className
})=>{

    // Classes
    let defaultClasses = 'rounded-lg bg-transparent border-white border px-2 py-2.5 sm:px-5 sm:py-2 flex items-center';

    return(
        <button className={`${defaultClasses} ${className}`} 
            onClick={onClick}
        >
            {
                icon &&
                <span className='mr-3'>
                    { icon }
                </span>
            }
            <span className='text-white font-bold'>
                { label }
            </span>
        </button>
    )
}

export default OAuthButton;