'use client'

import Link from "next/link";
import Image from "next/image";
import { MdArrowDropDown, MdArrowDropUp, MdDashboard, MdNotifications, MdHelp, MdPerson, MdSettings } from "react-icons/md";
import { useState } from "react";

const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isToggle, setIsToggled] = useState(false);

    return (
        <nav className="bg-white border-t-4 border-gray-900 p-4 rounded-full fixed top-0 left-1/2 transform -translate-x-1/2 w-full z-20 mt-3 lg:max-w-6xl md:max-w-3xl sm:max-w-xl">
          <div className="container mx-auto flex flex-wrap justify-between items-center">
            <div className="text-2xl font-bold text-indigo-800 sm:text-xl md:text-2xl lg:text-3xl">
                <Link href={'/'}>
                    <span className="hover:text-indigo-600 transition duration-300 ease-in-out transform hover:scale-150 hover:animate-pulse">
                        MovieJa<span className="text-indigo-200">MM</span>er
                    </span>
                </Link>
            </div>
            <div className="space-x-2">
              {isLoggedIn ? (
                <div className="relative">
                  <div className="flex items-center cursor-pointer" onClick={() => setIsToggled(!isToggle)} aria-expanded={isToggle} role="button">
                    <div className="bg-gray-200 p-2 rounded-full flex items-center">
                      <Image className={`h-10 w-10 rounded-full ${isToggle ? 'border-2 border-indigo-800' : ''} sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12`} src="/Logo.png" alt="Profile" width={40} height={40} />
                      <div className="transition-transform duration-300">
                        {isToggle ? (
                          <MdArrowDropUp className="ml-2 h-10 w-10 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12" />
                        ) : (
                          <MdArrowDropDown className="ml-2 h-10 w-10 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12" />
                        )}
                      </div>
                    </div>
                  </div>
                  {isToggle && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                        <p className="block px-4 py-2">Hi, user ✌️</p>
                        <hr />
                      <Link href={'/profile'} className="block px-4 py-2 text-black hover:underline-animation">
                        <MdPerson className="inline-block mr-2" /> Profile
                      </Link>
                      <Link href={'/settings'} className="block px-4 py-2 text-black hover:underline-animation">
                        <MdSettings className="inline-block mr-2" /> Settings
                      </Link>
                      <Link href={'/dashboard'} className="block px-4 py-2 text-black hover:underline-animation">
                        <MdDashboard className="inline-block mr-2" /> Dashboard
                      </Link>
                      <Link href={'/notifications'} className="block px-4 py-2 text-black hover:underline-animation">
                        <MdNotifications className="inline-block mr-2" /> Notifications
                      </Link>
                      <Link href={'/help'} className="block px-4 py-2 text-black hover:underline-animation">
                        <MdHelp className="inline-block mr-2" /> Help
                      </Link>
                      <button className="block w-full text-left px-4 py-2 text-black hover:underline-animation" onClick={() => { setIsLoggedIn(false); setIsToggled(false); }}>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button className="bg-black text-white px-5 py-2 rounded border border-solid border-black hover:text-black hover:font-semibold hover:bg-white sm:px-3 sm:py-1 md:px-4 md:py-2 lg:px-5 lg:py-2" onClick={() => setIsLoggedIn(true)}>Login</button>
                  <button className="bg-black text-white px-5 py-2 rounded border border-solid border-black hover:text-black hover:font-semibold hover:bg-white sm:px-3 sm:py-1 md:px-4 md:py-2 lg:px-5 lg:py-2">Register</button>
                </> 
              )}
            </div>
          </div>
        </nav>
      );
    };

export default NavBar;
