import Navbar from '@/components/Navbar';
import React from 'react';

const MainLayout: React.FC<any> = ({ children })=>{

    return(
        <div className="min-h-screen flex flex-col">
            <Navbar/>

            {/** Main Content */}
            <div className='flex-1 bg-white relative'>
                { children }
            </div>
        </div>
    )
}

export default MainLayout;