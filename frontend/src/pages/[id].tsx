import React from 'react';
import Image from "next/image";
import { GetServerSideProps, NextPage } from 'next';
import MainLayout from '@/layouts/MainLayout';
import { withServerSideAuthentication } from '@/utils/authenticationUtils';
import { useProfiles } from '@/hooks/useProfiles';
import { Profile } from "@/types/Profile";
import sampleImage from "@/../public/sample.png"
import ProjectCard from '@/components/ProjectCard';
import { useRouter } from 'next/router';
import { useSingleProfile } from '@/hooks/useSingleProfile';
import CustomSkeleton from '@/components/CustomSkeleton';


const ProfilPage: NextPage<any> = ({  })=>{

    // Hooks
    const router = useRouter()

    // Profile ID
    const { id } = router.query

    // Fetched and Cached data
    const { data, isLoading, error, refetch} = useSingleProfile(id as string);

    // Effects
    React.useEffect(()=>{
        if (error) {
            router.replace('/404')
        }
    },[error]);

    return (
        <MainLayout>
            <div className='px-[5%] pb-[5%]'>

                {/** Profile Snapshot */}
                <CustomSkeleton isLoading={isLoading}>
                    <div className='flex items-center gap-[5%] py-7'>
                        <Image 
                            src={sampleImage} 
                            loader={()=> data?.profile.picture || '/sample.png'}
                            alt={data?.profile.name || "sample photo"} 
                            placeholder='blur'
                            className='w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] rounded-full object-cover object-center'
                        />
                        <div>
                            <p className='text-[20px] sm:text-[40px]'>
                                { data?.profile.name }
                            </p>
                            <p className='text-[16px] sm:text-[20px] text-borderGray leading-10'>
                                { data?.profile.role }
                            </p>
                            <p className='text-[16px] sm:text-[20px] text-borderGray leading-10'>
                                { data?.profile.location }
                            </p>
                        </div>
                    </div>
                </CustomSkeleton>
                <hr className='text-borderGray' />

                {/** Bio */}
                <CustomSkeleton isLoading={isLoading}>
                    <div className='py-3'>
                        <h2 className='text-[28px]'>
                            Biography
                        </h2>
                        <p className='font-light text-[14px] sm:text-[18px]'>
                            { data?.profile.bio }
                        </p>
                    </div>
                </CustomSkeleton>

                {/** Projects */}
                <h2 className='text-[28px] mt-[2%]'>Projects</h2>
                <div className='py-[2%] grid gap-[40px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

                    {/** Skeleton data */}
                    {
                        isLoading &&
                        [1,2,3,4,5,6,7].map((i)=>(
                            <CustomSkeleton key={`${i}csp`} isLoading={isLoading}>
                                <ProjectCard/>
                            </CustomSkeleton>
                        ))
                    }
                    {/** Actual Data */}
                    {
                        data?.profile.projects?.map((p, i)=>(
                            <ProjectCard 
                                key={p.id}
                                {...p}
                            />
                        ))
                    }
                </div>
            </div>
        </MainLayout>
    )
}

export const getServerSideProps: GetServerSideProps = withServerSideAuthentication(async (context)=>{
    return{
        props:{

        }
    }
})

export default ProfilPage;