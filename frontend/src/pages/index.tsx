import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import MainLayout from '@/layouts/MainLayout';
import ProfileCard from '@/components/ProfileCard';
import { withServerSideAuthentication } from '@/utils/authenticationUtils';
import { useProfiles } from '@/hooks/useProfiles';
import { SearchContext } from '@/contexts/SearchContext';
import SearchBar from '@/components/SearchBar';

export interface HomePageProps{
    providers?: Record<any, any>;
}

const HomePage: NextPage<any> = ({  })=>{

    // Fetched and Cached data
    const { data, isLoading, error, refetch} = useProfiles();

    // Contexts
    const { profiles, setProfiles } = React.useContext(SearchContext);

    // Handlers
    const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (e)=>{

        let searchTerm = e.target.value.toLowerCase();

        let filteredData = data?.data.filter((p)=>{
            if (p.name.toLowerCase().includes(searchTerm) || p.role.toLowerCase().includes(searchTerm)) {
                return p;
            }
        })

        setProfiles(filteredData || []);
    }

    // Effect
    React.useEffect(()=>{
        if (data) {
            setProfiles(data.data);
        }
    },[data])

    return (
        <MainLayout>

            {/** Mobile Search Bar */}
            <div className="flex justify-center">
                <SearchBar 
                    containerClass='flex lg:hidden'
                    onChange={handleSearchChange}
                />
            </div>
           <div className='px-[5%]'>

                {/** Title */}
                <div className='text-[28px] md:text-[35px] lg:text-[50px] text-center mt-5'>
                    <h1 data-testid="page-title">
                        Welcome to DLTA Profiles 
                    </h1>
                    <h1 className='lg:leading-8 text-buttonBlue'>The home of Elites.</h1>     
                </div>

                {/** Grid Label */}
                <p className='text-xl mt-[5%]'>List of all Devs</p>
                <p className='text-base text-borderGray'>Showing { profiles.length || 0 } results</p>

                <div className='py-[5%] px-[3%] sm:px-[7%] sm:py-[3%] grid gap-[20px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

                    {/** Skeleton data */}
                    {
                        isLoading &&
                        [1,2,3,4,5,6,7].map((i)=>(
                            <div key={`${i}sk`} className='skeleton [&>*]:opacity-0'>
                                <ProfileCard/>
                            </div>
                        ))
                    }

                    {/** Actual Data */}
                    {
                        profiles.map((p, i)=>(
                            <ProfileCard key={p.id} {...p}/>
                        ))
                    }
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