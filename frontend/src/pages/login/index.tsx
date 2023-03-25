import React from 'react';
import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { signIn } from "next-auth/react";
import AuthLayout from '@/layouts/AuthLayout';
import { SiGoogle, SiFacebook, SiGithub } from "react-icons/si";
import OAuthButton from '@/components/OAuthButton';
import CustomButton from '@/components/CustomButton';
import SignInForm from '@/forms/SignInForm';
import { useRouter } from 'next/router';
import { withServerSideAuthPageProtection } from '@/utils/authenticationUtils';
import { SignInFormState } from '@/forms/SignInForm/schema';

export interface SignInPageProps{
   errorMessage?: string
}

/**
 * Inspirations:
 * https://reacthustle.com/blog/nextjs-redirect-after-login
 * https://reacthustle.com/blog/how-to-chain-multiple-middleware-functions-in-nextjs
 * @param param0 
 * @returns 
 */
const SignInPage: NextPage<SignInPageProps> = ({ errorMessage })=>{

    // Hooks
    const router = useRouter();
    const callback = router.query?.callback as string ?? "/";

    // State
    const [errMsg, setErrMsg] = React.useState(errorMessage);
    const [loading, setLoading] = React.useState<boolean>(false);

    // Handlers
    const handleSignIn = async () => {
        await signIn('google', { callbackUrl: callback });
    };

    const handleFacebookSignIn = async ()=>{
        await signIn('facebook');
    }

    const handleGithubSignIn = async ()=>{
        await signIn('github');
    }

    const handleCredentialsSignIn = async (state: SignInFormState)=>{
        setLoading(true);
        const result = await signIn("credentials", {
            redirect: false,
            email: state.email,
            password: state.password
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

    const gotoSignUp = ()=>{
        router.push('/register')
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
                    <h2 className='font-bold text-white text-[32px] text-center'>
                        Sign in to DLTA Profiles
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
                <SignInForm 
                    onFormSubmit={handleCredentialsSignIn}
                    loading={loading}
                />
                
                {/** Need an Account? */}
                <div className='flex items-center mt-[30px] text-white justify-center'>
                    <p className='text-sm mr-3'>Need an Account?</p>
                    <CustomButton variant='outlined' className='text-sm'
                        onClick={gotoSignUp}
                    >
                        SIGN UP
                    </CustomButton>
                </div>
           </div>
        </AuthLayout>
    )
}

export default SignInPage;


export const getServerSideProps: GetServerSideProps = withServerSideAuthPageProtection(async ({ query, req })=> {

    console.log(req.url);
    
    if (query.error) {
        let error = query.error as string
        
        if (error.includes('-')) {
            let tokens = error.split('-');
            return {
                props: {
                    errorMessage: tokens[1]
                },
            };
        }  
    }

    return {
        props: {
        },
    };
})
    
    