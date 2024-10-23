'use client';

import Link from 'next/link';

const Notifications = () => {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
            <h1 className="text-4xl font-bold text-indigo-500 mb-6">Notifications Page</h1>
            <p className="text-xl mb-4">Whoops the admin forgot to implement this page!</p>

            {/* Loading (not developed yet) */}
            <div className="animate-pulse mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-indigo-500 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="2" x2="12" y2="12" />
                    <line x1="12" y1="12" x2="16" y2="16" />
                </svg>
            </div>

            {/* Link to redirect back to the home or dashboard page */}
            <Link href="/" className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition duration-300">
                Go Back to Home
            </Link>
        </div>
    );
};

export default Notifications;
