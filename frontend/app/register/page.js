'use client';

import Link from 'next/link';
import { useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { MdArrowBack } from 'react-icons/md';
import Particles from "@/components/ui/particles"; 
import { registerCall } from '@/lib/apiCalls';

//Regular expressions for validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //Regex for email
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; //Regex for password

const RegistrationPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        dob: '',
        location: '',
        bio: ''
    });
    const [countries, setCountries] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();

    //Fetch the list of countries from API
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                const data = await response.json();
                //Sort the countries alphabetically
                const countryList = data.map(country => country.name.common).sort();
                setCountries(countryList);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };
        fetchCountries();
    }, []);

    //handle form change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    //handle registration button (form submit)
    const handleRegistration = async (e) => {
        e.preventDefault(); //prevent default submissions
        setErrorMessage(''); //set error message to empty state
        setSuccessMessage('');//set success message to empty state
    
        //api body requriments
        const { username, email, password, confirmPassword, name, dob, location, bio } = formData;
    
        //Validation of register form
        if (!username || !email || !password || !confirmPassword || !name || !dob || !location) {
            setErrorMessage('Please fill in all required fields');
            return;
        }
    
        if (!emailRegex.test(email)) {
            setErrorMessage('Please enter a valid email address.');
            return;
        }
    
        if (!passwordRegex.test(password)) {
            setErrorMessage('Password must be at least 8 characters long and include at least one number.');
            return;
        }
    
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }
    
        //Register user
        try {
            const data = await registerCall(username, email, password, confirmPassword, name, dob, location, bio);
            setSuccessMessage(data.message || 'Registration successful!');
    
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } catch (error) {
            setErrorMessage(error.message || 'Registration failed. Please try again.');
        }
    };
    

    return (
        <div className="relative min-h-screen bg-gray-800 mt-12">
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
                <div className="bg-gray-900 shadow-lg rounded-lg p-8 max-w-5xl w-full">
                    <Link href="/" className="flex items-center mb-6 text-gray-400 hover:text-gray-100 transition">
                        <MdArrowBack className="mr-2" /> Back to Home
                    </Link>
                    <h2 className="text-3xl font-bold mb-8 text-center text-indigo-500">Create an Account</h2>

                    {/* Form */}
                    <form onSubmit={handleRegistration} className="space-y-6">
                        
                        {/* Username and Email (horizontal layout on desktop) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="username" className="block text-gray-300">
                                    Username <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="Username"
                                    className="w-full px-4 py-2 border border-gray-700 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-300 transition"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-gray-300">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    className="w-full px-4 py-2 border border-gray-700 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-300 transition"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Full Name and Password */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-gray-300">
                                    Full Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Full Name"
                                    className="w-full px-4 py-2 border border-gray-700 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-300 transition"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-gray-300">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    className="w-full px-4 py-2 border border-gray-700 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-300 transition"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Confirm Password and Date of Birth */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="confirmPassword" className="block text-gray-300">
                                    Confirm Password <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder="Confirm Password"
                                    className="w-full px-4 py-2 border border-gray-700 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-300 transition"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="dob" className="block text-gray-300">
                                    Date of Birth <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="date"
                                    name="dob"
                                    id="dob"
                                    className="w-full px-4 py-2 border border-gray-700 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-300 transition"
                                    value={formData.dob}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Location (Country) and Bio */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="location" className="block text-gray-300">
                                    Location <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="location"
                                    id="location"
                                    className="w-full px-4 py-2 border border-gray-700 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-300 transition"
                                    value={formData.location}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Your Country</option>
                                    {countries.length > 0 ? (
                                        countries.map((country) => (
                                            <option key={country} value={country}>
                                                {country}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="">Loading countries...</option>
                                    )}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="bio" className="block text-gray-300">
                                    Short Bio
                                </label>
                                <textarea
                                    name="bio"
                                    id="bio"
                                    placeholder="Short Bio"
                                    className="w-full px-4 py-2 border border-gray-700 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-300 transition resize-none"
                                    rows="4"
                                    value={formData.bio}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Error and Success Messages */}
                        {errorMessage && <div className="mb-4 p-4 bg-red-100 text-red-600 rounded mt-3">{errorMessage}</div>}
                        {successMessage && <div className="mb-4 p-4 bg-green-100 text-green-600 rounded mt-3">{successMessage}</div>}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 transition"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default RegistrationPage;