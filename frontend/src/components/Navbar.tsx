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

const Navbar: React.FC<any> = ({ children })=>{

    // Handlers
    const handleLogout = async ()=>{
        await signOut({ callbackUrl: '/login' })
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
            <div className='flex-1 flex justify-center'>
                <SearchBar containerClass='hidden lg:flex'/>
            </div>

            {/** Actions */}
            <div className='hidden lg:flex items-center justify-end gap-[50px]'>
                <Image src={bellLogo} alt="dlta profiles logo" className='w-[30px]'/>
                <ProfileDropdown onLogout={handleLogout}/>
            </div>

            {/** Hamburger Menu */}
            <button 
                type="button" 
                data-drawer-target="hamburger" 
                data-drawer-show="hamburger" 
                aria-controls="hamburger"
                className='block lg:hidden'
            >
                <GiHamburgerMenu size={25}/>
            </button>

        </div>
        </>
    )
}

export default Navbar;