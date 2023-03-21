import React from 'react';

const Navbar: React.FC<any> = ({ children })=>{

    return(
        <div className="auth-bg min-h-screen flex flex-col justify-center items-center">
            { children }
        </div>
    )
}

export default Navbar;