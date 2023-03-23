import React from 'react';
import { Formik } from 'formik';
import { SignUpFormSchema, SignUpFormState } from './schema';
import CustomFormTextInput from '../../components/CustomFormInput';
import { Client } from '@/types/Client';
import CustomButton from '@/components/CustomButton';


export interface SignUpFormProps{
    onFormSubmit?: (state: SignUpFormState, resetForm?: ()=> void)=> void; 
    loading?: boolean;
    data?: Client;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onFormSubmit, loading, data })=>{

    // State
    const [submitted, setSubmitted] = React.useState<boolean>(false);

    let initialValues: SignUpFormState = {
        email: '',
        password: ''
    }


    return(
        <Formik
            initialValues={initialValues}
            validationSchema={SignUpFormSchema}
            onSubmit={(values, actions)=>{
               
                setSubmitted(false); 
                onFormSubmit && onFormSubmit(values, actions.resetForm);
              
            }}
        >
            { (props)=>
            <form onSubmit={(e)=> e.preventDefault()} className="w-full" >
                <CustomFormTextInput
                    label='Email'
                    placeholder='your@email.com'
                    error={!!props.errors.email && submitted}
                    // errorMessage={props.errors.email}
                    errorMessage='Required'
                    onChange={props.handleChange('email')}
                    value={props.values.email}
                    containerClass="mb-6"
                />

                <CustomFormTextInput
                    label='Password'
                    placeholder=''
                    type="password"
                    error={!!props.errors.password && submitted}
                    errorMessage={props.errors.password}
                    onChange={props.handleChange('password')}
                    value={props.values.password}
                    containerClass="form-input"
                />

                <div className='flex mt-[10%]'>
                   <CustomButton className="font-bold sm:py-3 px-8 w-full rounded"
                        onClick={()=>{
                            props.handleSubmit();
                            setSubmitted(true)
                        }}
                        disabled={loading}
                        loading={loading}
                    >
                        COMPLETE THE SIGN UP
                    </CustomButton>
                </div>
            </form>
            }
        </Formik>
    )
}


export default SignUpForm;