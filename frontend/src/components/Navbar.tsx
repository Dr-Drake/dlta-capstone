import React from 'react';
import Link from 'next/link';
import Image from "next/image";
import logo from "@/assets/logo.svg";
import bellLogo from "@/assets/bell.svg";
import ProfileDropdown from './ProfileDropdown';
import SearchBar from './SearchBar';
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { signOut } from "next-auth/react";
import { Drawer } from 'flowbite';
import { useProfiles } from '@/hooks/useProfiles';
import { Profile } from '@/types/Profile';
import { SearchContext } from '@/contexts/SearchContext';
import { useRouter } from 'next/router';

const Navbar: React.FC<any> = ({ children })=>{

    // Ref
    const drawerRef = React.createRef<HTMLDivElement>();

    // Fetched and Cached data
    const { data, isLoading, error, refetch} = useProfiles();

    // Hooks
    const router = useRouter();

    // Contexts
    const { setProfiles } = React.useContext(SearchContext)

    // Variables
    let drawer: Drawer | null = null;
    const hiddenClass = "hidden";
    const searchbarClasses = "hidden lg:flex";

    // Handlers
    const handleLogout = async ()=>{
        await signOut({ callbackUrl: '/login' })
    }

    const toggleDrawer = ()=>{
        drawer?.toggle();
    }

    const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (e)=>{

        let searchTerm = e.target.value.toLowerCase();

        let filteredData = data?.data.filter((p)=>{
            if (p.name.toLowerCase().includes(searchTerm) || p.role.toLowerCase().includes(searchTerm)) {
                return p;
            }
        })

        setProfiles(filteredData || []);
    }


    // Elements
    const drawerLogoLink = (
        <Link href="/">
            <div className='flex items-center'>
                <Image src={logo} alt="dlta profiles logo" className='w-[25px] lg:w-[40px]'/>
                <p className='font-bold text-2xl ml-2'>
                    DLTA <span className='text-buttonBlue'>Profiles</span>
                </p>
            </div>
        </Link>
    )
    const drawerCloseButton = (
        <button type="button" data-drawer-hide="hamburger" aria-controls="hamburger">
            <GrClose/>
        </button>
    )

    const mobileDrawer = (
        <div 
            ref={drawerRef}
            id="hamburger" 
            className="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-80 dark:bg-gray-800" tabIndex={-1} aria-labelledby="drawer-label"
        >
            <div className='flex justify-between items-center'>
                { drawerLogoLink }
                { drawerCloseButton }
            </div>
            <div className="py-4 overflow-y-auto">
                <ul className="space-y-2">
                    <li onClick={handleLogout}>
                        <p className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-buttonBlue dark:hover:bg-gray-700 hover:text-white cursor-pointer">
                            <span>Logout</span>
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    )


    // Effects
    React.useEffect(()=>{
        if (drawerRef.current) {
            drawer = new Drawer(drawerRef.current)
        }
    },[drawerRef])

    return(
        <>
        { mobileDrawer }
        <div className="flex bg-white items-center py-[3%] lg:py-[.8%] px-[5%] sticky top-0 z-10">
            
            {/** Logo */}
            <div>
                <Link href="/">
                    <div className='flex items-center'>
                        <Image src={logo} alt="dlta profiles logo" className='w-[25px] lg:w-[40px]'/>
                        <p className='font-bold text-2xl ml-2'>
                            DLTA <span className='text-buttonBlue'>Profiles</span>
                        </p>
                    </div>
                </Link>
            </div>

            {/** Middle Spacer */}
            <div className='flex-1 flex justify-center pr-5'>
                <SearchBar 
                    containerClass={router.pathname === '/[id]' ? hiddenClass : searchbarClasses}
                    onChange={handleSearchChange}
                />
            </div>

            {/** Actions */}
            <div className='hidden lg:flex items-center justify-end gap-[50px]'>
                {/* <Image src={bellLogo} alt="dlta profiles logo" className='w-[30px]'/> */}
                <ProfileDropdown onLogout={handleLogout}/>
            </div>

            {/** Hamburger Menu */}
            <button 
                type="button" 
                data-drawer-target="hamburger" 
                data-drawer-show="hamburger" 
                aria-controls="hamburger"
                className='block lg:hidden'
                onClick={toggleDrawer}
            >
                <GiHamburgerMenu size={25}/>
            </button>

        </div>
        </>
    )
}

export default Navbar;