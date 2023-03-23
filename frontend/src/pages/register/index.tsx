import React from 'react';
import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { getProviders, signIn, getSession } from "next-auth/react";
import AuthLayout from '@/layouts/AuthLayout';
import { SiGoogle, SiFacebook, SiGithub } from "react-icons/si";
import OAuthButton from '@/components/OAuthButton';
import CustomButton from '@/components/CustomButton';
import SignUpForm from '@/forms/SignUpForm';
import { useRouter } from 'next/router';
import { withServerSideAuthPageProtection } from '@/utils/authenticationUtils';
import { SignUpFormState } from '@/forms/SignUpForm/schema';

export interface SignUpPageProps{
    errorMessage?: string;
}

const SignUpPage: NextPage<SignUpPageProps> = ({ errorMessage })=>{

    // Hooks
    const router = useRouter();
    const callback = router.query?.callback as string ?? "/";

    // State
    const [errMsg, setErrMsg] = React.useState(errorMessage);
    const [loading, setLoading] = React.useState<boolean>(false);

    // Handlers
    const handleSignIn = async () => {
        let result = await signIn('google', { callbackUrl: callback });
        console.log(result);
    };

    const handleFacebookSignIn = async ()=>{
        await signIn('facebook');
    }

    const handleGithubSignIn = async ()=>{
        await signIn('github');
    }

    const gotoSignIn = ()=>{
        router.push('/login')
    }

    const handleCredentialsSignUp = async (state: SignUpFormState)=>{
        setLoading(true);
        const result = await signIn("credentials", {
            redirect: false,
            email: state.email,
            password: state.password,
            type: 'signup'
        });

        if (result) {

            if (result?.error) {
                setLoading(false);
                setErrMsg(result.error)
            }
    
            if (result?.ok) {
                router.push(callback);
            }
        }
        else{
            setLoading(false);
        }

    }

    return (
        <AuthLayout>
           <div className='max-w-full min-w-full md:min-w-[32rem] md:max-w-[32rem] lg:min-w-[24rem] px-5'>

                {/** Error Message */}
                {
                    errMsg &&
                    <div className='bg-red-500 rounded-lg p-3 text-white text-sm text-center transition-all duration-300 delay-300 mb-5 '>
                        { errMsg }
                    </div>
                }

                {/** Prompt */}
                <div className='mb-[5%]'>
                    <h2 className='font-bold text-white text-[28px] sm:text-[32px] text-center'>
                        Sign up for DLTA Profiles
                    </h2>
                </div>

                {/** OAuth Sign In */}
                <div className='flex items-center gap-2 sm:gap-5'>
                    <OAuthButton
                        label='GitHub'
                        icon={<SiGithub color='white'/>}
                        className="flex-1 sm:w-max"
                        onClick={handleGithubSignIn}
                    />
                    <OAuthButton
                        label='Facebook'
                        icon={<SiFacebook color='white'/>}
                        className="flex-1 sm:w-max"
                        onClick={handleFacebookSignIn}
                    />
                    <OAuthButton
                        label='Google'
                        icon={<SiGoogle color='white'/>}
                        className="flex-1 sm:w-max"
                        onClick={handleSignIn}
                    />
                </div>

                {/** Horizontal separator */}
                <div className='my-6 flex items-center'>
                    <hr className='h-[1px] bg-white w-full'/>
                    <p className='text-white mx-3 font-bold'>OR</p>
                    <hr className='h-[1px] bg-white w-full'/>
                </div>

                {/** Form Sign In */}
                <SignUpForm 
                    onFormSubmit={handleCredentialsSignUp}
                    loading={loading}
                />
                
                {/** Terms and Conditions */}
                <div className='mt-[25px] text-white '>
                    <p className='text-center'>By Signing up you agree to our terms and conditions </p>

                    <div className='mt-[15px] flex items-center justify-center'>
                        <p className='text-sm mr-3'>Already have an Account?</p>
                        <CustomButton variant='outlined' className='text-sm'
                            onClick={gotoSignIn}
                        >
                            SIGN IN
                        </CustomButton>
                    </div>
                </div>
           </div>
        </AuthLayout>
    )
}

export default SignUpPage;


export const getServerSideProps: GetServerSideProps = withServerSideAuthPageProtection(async (context)=> {

    // let providers = await getProviders();
    // console.log(providers);
    return {
        props: {
        },
    };
})