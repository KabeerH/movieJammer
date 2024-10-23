'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { MdSearch, MdMenu, MdClose, MdArrowDropDown, MdArrowDropUp, MdPerson, MdDashboard, MdNotifications, MdHelp, MdLogout } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { getToken, removeToken } from '@/lib/authenticate';
import { profileCall } from '@/lib/apiCalls';
import Image from 'next/image';

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);
    const router = useRouter();
    const pathname = usePathname(); //Get current pathname

    const token = getToken() //get the jwt token

    useEffect(() => {
        const fetchUserData = async () => {
            if (token) {
                try {
                    const data = await profileCall(token); 
                    setUser(data); 
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchUserData(); //fetch data

        const handleRouteChange = () => fetchUserData(); //Function to handle route changes

        router.events?.on('routeChangeComplete', handleRouteChange); //Listen for route changes

        return () => {
            router.events?.off('routeChangeComplete', handleRouteChange); //Clean up event listener on unmount
        };
    }, [pathname, router.events, token]); //Re-fetch user data when the pathname or token changes

    //function to handle logout
    const handleLogout = () => {
        removeToken(); //remove jwt token
        setUser(null); //Clear user data
        router.push('/'); //Redirect to home or login page
        setIsProfileDropdownOpen(false);
        setIsMenuOpen(false)
    };

    //function to handle search
    const handleSearch = (e) => {
        e.preventDefault(); //prevent default submissions of the form
        //search functionality 
        if (searchQuery.trim() !== '') {
            router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
        setSearchQuery(''); //set the search input to empty state
        setIsMenuOpen(false); //set menu to close
        setIsProfileDropdownOpen(false); //set profile dropdown to close
    };

return (
        <nav className="bg-gray-900 text-white shadow-md fixed top-0 w-full z-20">
            <div className="container mx-auto flex justify-between items-center py-4 px-6">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center space-x-2 text-3xl font-extrabold text-indigo-500 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:text-indigo-400"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <span>MovieJa<span className="text-indigo-300">MM</span>er</span>
                    <Image
                        src='/favicon.ico'
                        alt='logo'
                        height={32}
                        width={32}
                        className="transition-transform duration-300 ease-in-out transform scale-100 hover:scale-110"
                    />
                </Link>

                {/* Search Bar for Desktop */}
                <form
                    onSubmit={handleSearch}
                    className="relative hidden md:flex items-center bg-gray-800 rounded-full p-2 shadow-sm w-1/3"
                >
                    <input
                        type="text"
                        className="bg-transparent outline-none px-4 py-2 text-white w-full"
                        placeholder="Search movies..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition duration-300"
                    >
                        <MdSearch size={24} />
                    </button>
                </form>

                {/* Menu for Desktop */}
                <div className="hidden md:flex items-center space-x-6">
                    {user && token ? (
                        <div className="relative">
                            <div
                                className="flex items-center cursor-pointer space-x-2"
                                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                aria-expanded={isProfileDropdownOpen}
                                role="button"
                            >
                                <span className="text-indigo-400 font-semibold">{user.name || user.username}</span>
                                {isProfileDropdownOpen ? <MdArrowDropUp className="text-indigo-400" /> : <MdArrowDropDown className="text-indigo-400" />}
                            </div>
                            {isProfileDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-gray-800 border rounded shadow-lg">
                                    <Link onClick={() => setIsProfileDropdownOpen(false)} href={'/profile'} className="block px-4 py-2 text-white hover:bg-gray-700 transition duration-200">
                                        <MdPerson className="inline-block mr-2" /> Profile
                                    </Link>
                                    <Link onClick={() => setIsProfileDropdownOpen(false)} href={'/dashboard'} className="block px-4 py-2 text-white hover:bg-gray-700 transition duration-200">
                                        <MdDashboard className="inline-block mr-2" /> Dashboard
                                    </Link>
                                    <Link onClick={() => setIsProfileDropdownOpen(false)} href={'/notifications'} className="block px-4 py-2 text-white hover:bg-gray-700 transition duration-200">
                                        <MdNotifications className="inline-block mr-2" /> Notifications
                                    </Link>
                                    <Link onClick={() => setIsProfileDropdownOpen(false)} href={'/help'} className="block px-4 py-2 text-white hover:bg-gray-700 transition duration-200">
                                        <MdHelp className="inline-block mr-2" /> Help
                                    </Link>
                                    <button
                                        className="block w-full text-left px-4 py-2 text-white hover:bg-gray-700 transition duration-200"
                                        onClick={handleLogout}
                                    >
                                        <MdLogout className='inline-block mr-2' /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition duration-300"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="bg-gray-700 text-white px-5 py-2 rounded-full hover:bg-gray-800 transition duration-300"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className={`md:hidden text-white focus:outline-none transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? (
                        <MdClose size={32} className="transform transition-transform duration-300 scale-110" />
                    ) : (
                        <MdMenu size={32} className="transform transition-transform duration-300 scale-100" />
                    )}
                </button>

                {/* Mobile Menu */}
                <div
                    className={`absolute top-16 left-0 w-full bg-gray-900 shadow-lg md:hidden flex flex-col items-center transition-all duration-300 ${
                        isMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
                >
                    {/* Mobile Search Bar */}
                    <form
                        onSubmit={handleSearch}
                        className="flex items-center w-11/12 bg-gray-800 rounded-full p-2 mb-4"
                    >
                        <input
                            type="text"
                            className="bg-transparent outline-none px-4 py-2 text-white w-full"
                            placeholder="Search movies..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition duration-300"
                        >
                            <MdSearch size={24} />
                        </button>
                    </form>

                    {/* Conditional Mobile Menu Buttons */}
                    {user ? (
                        <div className="flex justify-center w-full px-6 space-x-4 mb-4">
                            <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="flex justify-center items-center w-12 h-12 bg-gray-700 text-white rounded-full hover:bg-gray-800 transition">
                                <MdPerson size={24} />
                            </Link>
                            <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="flex justify-center items-center w-12 h-12 bg-gray-700 text-white rounded-full hover:bg-gray-800 transition">
                                <MdDashboard size={24} />
                            </Link>
                            <Link href="/notifications" onClick={() => setIsMenuOpen(false)} className="flex justify-center items-center w-12 h-12 bg-gray-700 text-white rounded-full hover:bg-gray-800 transition">
                                <MdNotifications size={24} />
                            </Link>
                            <Link href="/help" onClick={() => setIsMenuOpen(false)} className="flex justify-center items-center w-12 h-12 bg-gray-700 text-white rounded-full hover:bg-gray-800 transition">
                                <MdHelp size={24} />
                            </Link>
                        </div>
                    ) : (
                        <div className="flex justify-center w-full px-6 space-x-4 mb-4">
                            <Link href="/login" onClick={() => setIsMenuOpen(false)} className="flex justify-center items-center w-full h-12 bg-indigo-600 text-white text-lg font-bold rounded-full hover:bg-indigo-700 transition duration-300">
                                Login
                            </Link>
                            <Link href="/register" onClick={() => setIsMenuOpen(false)} className="flex justify-center items-center w-full h-12 bg-gray-700 text-white text-lg font-bold rounded-full hover:bg-gray-800 transition duration-300">
                                Register
                            </Link>
                        </div>
                    )}

                    {/* Logout Button */}
                    {user && (
                        <div className="w-full flex justify-center px-6 pb-3">
                            <button
                                className="w-full py-3 bg-red-600 text-white text-center rounded-full hover:bg-red-700 transition duration-300"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;