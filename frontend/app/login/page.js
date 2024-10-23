'use client';

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MdArrowBack } from "react-icons/md";
import Particles from "@/components/ui/particles"; 
import { loginCall } from "@/lib/apiCalls";
import { getToken, setToken } from "@/lib/authenticate";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const router = useRouter();
    const token = getToken();

    //check if user is logged in - redirect to dashboard page
    if (token) {
        router.push('/dashboard')
    } 

    //function to handle logins
    const handleLogin = async (e) => {
        e.preventDefault(); //prevent default form submissions
    
        setErrorMessage(""); //set error message to empty
        setSuccessMessage("");//set success message to empty
    
        //field vaildations
        if (!username || !password) {
            setErrorMessage("Please fill in all fields.");
            return;
        }
        
        try {
            const data = await loginCall(username, password); 

            setSuccessMessage(data.message || "Login successful!");

            setToken(data.token)
    
            setTimeout(() => {
                router.push('/dashboard'); 
            }, 2000);

        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="relative min-h-screen bg-gray-800">
            {/* Magic UI Particles Component */}
            <Particles 
                className="absolute inset-0 z-0" 
                quantity={100} 
                ease={80} 
                color="#ffffff"
                refresh
            />
            
            {/* Centered Form */}
            <div className="flex items-center justify-center min-h-screen relative z-10">
                <div className="bg-gray-900 shadow-lg rounded-lg p-10 max-w-lg w-full">
                    <Link href="/" className="flex items-center mb-6 text-gray-300 hover:text-gray-100 transition">
                        <MdArrowBack className="mr-2" /> Back to Home
                    </Link>
                    <h2 className="text-3xl font-bold mb-8 text-center text-indigo-600">Login to Your Account</h2>
                    
                    
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <input
                                type="text"
                                placeholder="Username"
                                className="w-full px-4 py-2 border border-gray-700 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-300 transition"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full px-4 py-2 border border-gray-700 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-300 transition"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300"
                        >
                            Login
                        </button>
                    </form>
                    
                    <p className="mt-6 text-center text-gray-300">
                        Don&apos;t have an account? <Link href="/register" className="text-indigo-600 hover:text-indigo-700">Register here</Link>
                    </p>

                    {errorMessage && <div className="mb-4 p-4 bg-red-100 text-red-600 rounded mt-3">{errorMessage}</div>}
                    {successMessage && <div className="mb-4 p-4 bg-green-100 text-green-600 rounded mt-3">{successMessage}</div>}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;