import React from 'react';
import { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { getProviders, signIn, getSession } from "next-auth/react";
import AuthLayout from '@/layouts/AuthLayout';
import { SiGoogle, SiFacebook, SiGithub } from "react-icons/si";
import OAuthButton from '@/components/OAuthButton';
import CustomButton from '@/components/CustomButton';
import SignUpForm from '@/forms/SignUpForm';

export interface SignUpPageProps{
    providers?: Record<any, any>;
}

const SignUpPage: NextPage<SignUpPageProps> = ({ providers })=>{

    return (
        <AuthLayout>
           <div className='max-w-full min-w-full sm:min-w-[24rem] px-5'>

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
                    />
                </div>

                {/** Horizontal separator */}
                <div className='my-6 flex items-center'>
                    <hr className='h-[1px] bg-white w-full'/>
                    <p className='text-white mx-3 font-bold'>OR</p>
                    <hr className='h-[1px] bg-white w-full'/>
                </div>

                {/** Form Sign In */}
                <SignUpForm/>
                
                {/** Terms and Conditions */}
                <div className='mt-[25px] text-white '>
                    <p className='text-center'>By Signing up you agree to our terms and conditions </p>

                    <div className='mt-[15px] flex items-center justify-center'>
                        <p className='text-sm mr-3'>Already have an Account?</p>
                        <CustomButton variant='outlined' className='text-sm'>
                            SIGN IN
                        </CustomButton>
                    </div>
                </div>
           </div>
        </AuthLayout>
    )
}

export default SignUpPage;


export const getServerSideProps: GetServerSideProps = async (context)=> {

    let providers = await getProviders();
    console.log(providers);
    return {
        props: {
            providers
        },
    };
}