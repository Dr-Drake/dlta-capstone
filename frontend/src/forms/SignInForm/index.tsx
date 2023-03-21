import React from 'react';
import { Formik } from 'formik';
import { SignInFormSchema, SignInFormState } from './schema';
import CustomFormTextInput from '../../components/CustomFormInput';
import { Client } from '@/types/Client';


export interface SignInFormProps{
    onFormSubmit?: (state: SignInFormState, resetForm?: ()=> void)=> void; 
    loading?: boolean;
    data?: Client;
}

const SignInForm: React.FC<SignInFormProps> = ({ onFormSubmit, loading, data })=>{

    // State
    const [submitted, setSubmitted] = React.useState<boolean>(false);

    let initialValues: SignInFormState = {
        email: '',
        password: ''
    }


    return(
        <Formik
            initialValues={initialValues}
            validationSchema={SignInFormSchema}
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
                    <button className="bg-buttonBlue text-white font-bold py-3 px-8 w-full rounded"
                        onClick={()=>{
                            props.handleSubmit();
                            setSubmitted(true)
                        }}
                        disabled={loading}
                    >
                        SIGN IN
                    </button>
                </div>
            </form>
            }
        </Formik>
    )
}


export default SignInForm;