'use client'

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const NavBar = () => {

    const [drowDownMenu, setDropDownMenu] = useState(false)

    return (
        <nav className="w-screen h-fit bg-black border shadow-xl fixed z-50">
            <div className="flex items-center justify-between p-4">
                <div>
                    <Link href='/'>
                        <Image 
                            width={50}
                            height={50}
                            src='/logo.png'
                            alt="MovieJaMMer logo"
                            className="rounded-full hover:animate-spin"
                        />
                    </Link>
                </div>
                <div className="flex space-x-4 mr-4">
                    {drowDownMenu ? <p>You have access!</p>
                        
                        : 
                        <>
                        <Link className="text-white font-bold font-mono underline-animation" href='/login'>Login</Link>
                        <Link className="text-white font-bold font-mono underline-animation" href='/register'>Register</Link>

                        </>}       
                </div>
            </div>
        </nav>
    )
}

export default NavBar;
