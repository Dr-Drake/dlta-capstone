import React from 'react';
import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { getProviders, signIn, getSession } from "next-auth/react";
import AuthLayout from '@/layouts/AuthLayout';
import { SiGoogle, SiFacebook, SiGithub } from "react-icons/si";
import OAuthButton from '@/components/OAuthButton';
import CustomButton from '@/components/CustomButton';
import SignInForm from '@/forms/SignInForm';
import { useRouter } from 'next/router';

export interface SignInPageProps{
    providers?: Record<any, any>;
}

const SignInPage: NextPage<SignInPageProps> = ({ providers })=>{

    // alert(process.env.NEXT_PUBLIC_GOOGLE_SECRET)

    // Hooks
    const router = useRouter();

    const handleSignIn = async () => {
        //e.preventDefault();
        await signIn('google');
    };

    const handleGithubSignIn = async ()=>{
        await signIn('github');
    }

    const gotoSignUp = ()=>{
        router.push('/register')
    }

    return (
        <AuthLayout>
           <div className='max-w-full min-w-full sm:min-w-[24rem] px-5'>

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
                <SignInForm/>
                
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


export const getServerSideProps: GetServerSideProps = async (context)=> {

    let providers = await getProviders();
    console.log(providers);
    console.log("NEXTAUTH_URL: ", process.env.NEXTAUTH_URL);
    return {
        props: {
            providers
        },
    };
}