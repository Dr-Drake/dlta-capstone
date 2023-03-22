import React from "react";
import Image from "next/image";
import profileLogo from "@/assets/profile.svg";

const ProfileDropdown: React.FC<any> = ()=>{

    return(
       <React.Fragment>
            <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown">
                <Image src={profileLogo} alt="dlta profiles logo" className='w-[30px]'/>
            </button>
            <div id="dropdown" className="z-10 hidden bg-slate-100 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    <li>
                        <p className="block px-4 py-2 hover:bg-buttonBlue dark:hover:bg-gray-600 dark:hover:text-white hover:text-white cursor-pointer">
                            Logout
                        </p>
                    </li>
                </ul>
            </div>
       </React.Fragment>
    )
}

export default ProfileDropdown;