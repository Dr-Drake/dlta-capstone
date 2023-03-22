import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import MainLayout from '@/layouts/MainLayout';
import ProfileCard from '@/components/ProfileCard';
import { withServerSideAuthentication } from '@/utils/authenticationUtils';

export interface HomePageProps{
    providers?: Record<any, any>;
}

const HomePage: NextPage<any> = ({  })=>{

    return (
        <MainLayout>
           <div className='px-[5%]'>

                {/** Title */}
                <div className='text-[28px] md:text-[35px] lg:text-[50px] text-center mt-5'>
                    <h1>
                        Welcome to DLTA Profiles 
                    </h1>
                    <h1 className='lg:leading-8 text-buttonBlue'>The home of Elites.</h1>     
                </div>

                {/** Grid Label */}
                <p className='text-xl mt-[5%]'>List of all Devs</p>
                <p className='text-base text-borderGray'>Showing 7 results</p>

                <div className='py-[5%] px-[8%] sm:py-[3%] grid gap-[20px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                    <ProfileCard/>
                    <ProfileCard/>
                    <ProfileCard/>
                    <ProfileCard/>
                    <ProfileCard/>
                    <ProfileCard/>
                    <ProfileCard/>
                </div>

           </div>
        </MainLayout>
    )
}

// export const getServerSideProps: GetServerSideProps = withServerSideAuthentication(async (context)=>{
//     return{
//         props:{

//         }
//     }
// })

export default HomePage;