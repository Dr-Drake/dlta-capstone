import React from 'react';

export interface CustomFormTextInputProps extends 
React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
    error?: boolean;
    errorMessage?: string;
    containerClass?: string;
    label?: string;
}

const CustomFormTextInput = React.forwardRef<HTMLInputElement,CustomFormTextInputProps>(({
    error = false, errorMessage = 'This field is required', containerClass, className, label,
    ...props 
}, ref)=>{
    // State
    const [isError, setIsError] = React.useState<boolean>(false);

    // Classes
    let inputClasses = 'border rounded-lg border-white bg-transparent text-base w-full p-3 outline-none';
    let errorClasses = 'border-red-600';

    // Effect
    React.useEffect(()=>{
        setIsError(error)
    }, [error]);

    //let forwardedProps: any = { ...props };

    return(
        <div className={containerClass}>
            {
                label &&
                <p className='text-base text-white mb-1'>
                    {label}
                </p> 
            }
            <input
                className={`${inputClasses} ${className} ${isError ? errorClasses : ''}`}
                {...props}
                ref={ref}
            />
            { 
                isError && 
                <label className='text-sm text-red-600'>
                    {errorMessage}
                </label> 
            }
        </div>
       
    )
}) 

CustomFormTextInput.displayName = 'CustomFormTextInput';

export default CustomFormTextInput;