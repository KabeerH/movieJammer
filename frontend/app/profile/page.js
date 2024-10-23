'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    MdArrowBack,
    MdEdit,
    MdEmail,
    MdPhone,
    MdLocationOn,
    MdOutlinePerson,
    MdOutlineInfo,
} from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { getToken, removeToken } from '@/lib/authenticate';
import { profileCall, updateProfileCall, deleteAccountCall } from '@/lib/apiCalls';

const ProfileSettings = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [showDeleteConfirmPopup, setShowDeleteConfirmPopup] = useState(false);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const token = getToken();

    // Load user data
    useEffect(() => {
        if (!token) {
            router.push('/login');
            return;
        }

        const fetchUserData = async () => {
            setLoading(true);
            if (token) {
                try {
                    const data = await profileCall(token);
                    setUser(data);
                } catch (error) {
                    console.log('Error fetching user data:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchUserData();
    }, [token]);

    // Handle the edit toggle
    const handleEditToggle = () => setIsEditing((prev) => !prev);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    // Handle save changes
    const handleSaveChanges = () => {
        setShowConfirmPopup(true);
    };

    // Handle account deletion
    const handleDeleteAccount = () => {
        setShowDeleteConfirmPopup(true);
    };

    // Confirm profile changes
    const confirmChanges = async () => {
        setShowConfirmPopup(false);
        setLoading(true);
        try {
            await updateProfileCall(token, user);
            const updatedUser = await profileCall(token);
            setUser(updatedUser);
            setIsEditing(false);
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Confirm account deletion
    const deleteAccount = async () => {
        setShowDeleteConfirmPopup(false);
        setLoading(true);
        try {
            await deleteAccountCall(token);
            removeToken();
            router.push('/login');
        } catch (error) {
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-800 p-6 font-sans text-white">
            <div className="flex items-center mb-8 mt-20 bg-gray-700 shadow-lg rounded-lg p-6 italic">
                <Link href={'/'}>
                    <MdArrowBack className="h-6 w-6 text-indigo-400 cursor-pointer" />
                </Link>
                <h1 className="text-4xl font-bold text-white ml-4">Profile Settings</h1>
            </div>

            <div className="bg-gray-900 shadow-xl rounded-lg overflow-hidden p-6">
                <div className="flex justify-end pb-6">
                    <button
                        onClick={handleEditToggle}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-full flex items-center hover:bg-indigo-700 transition duration-300"
                    >
                        {isEditing ? 'Cancel' : 'Edit'}
                        <MdEdit className="h-5 w-5 inline-block ml-1" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Username */}
                    <div className="flex items-center space-x-4">
                        <FaUser className="text-indigo-500" />
                        {isEditing ? (
                            <input
                                type="text"
                                name="username"
                                value={user.username || ''}
                                onChange={handleChange}
                                className="w-full p-3 border-b-2 border-gray-500 bg-gray-800 text-white focus:outline-none focus:border-indigo-600 rounded-lg"
                                placeholder="Username"
                            />
                        ) : (
                            <span className="text-white">{user.username || 'N/A'}</span>
                        )}
                    </div>

                    {/* Email */}
                    <div className="flex items-center space-x-4">
                        <MdEmail className="text-indigo-500" />
                        {isEditing ? (
                            <input
                                type="email"
                                name="email"
                                value={user.email || ''}
                                onChange={handleChange}
                                className="w-full p-3 border-b-2 border-gray-500 bg-gray-800 text-white focus:outline-none focus:border-indigo-600 rounded-lg"
                                placeholder="Email"
                            />
                        ) : (
                            <span className="text-white">{user.email || 'N/A'}</span>
                        )}
                    </div>

                    {/* Password */}
                    <div className="flex items-center space-x-4">
                        <MdOutlineInfo className="text-indigo-500" />
                        {isEditing ? (
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                className="w-full p-3 border-b-2 border-gray-500 bg-gray-800 text-white focus:outline-none focus:border-indigo-600 rounded-lg"
                                placeholder="Change password"
                            />
                        ) : (
                            <span className="text-white">**********</span>
                        )}
                    </div>

                    {/* Name */}
                    <div className="flex items-center space-x-4">
                        <FaUser className="text-indigo-500" />
                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={user.name || ''}
                                onChange={handleChange}
                                className="w-full p-3 border-b-2 border-gray-500 bg-gray-800 text-white focus:outline-none focus:border-indigo-600 rounded-lg"
                                placeholder="Name"
                            />
                        ) : (
                            <span className="text-white">{user.name || 'N/A'}</span>
                        )}
                    </div>

                    {/* Date of Birth */}
                    <div className="flex items-center space-x-4">
                        <MdOutlinePerson className="text-indigo-500" />
                        {isEditing ? (
                            <input
                                type="date"
                                name="dob"
                                value={user.dob || ''}
                                onChange={handleChange}
                                className="w-full p-3 border-b-2 border-gray-500 bg-gray-800 text-white focus:outline-none focus:border-indigo-600 rounded-lg"
                            />
                        ) : (
                            <span className="text-white">{user.dob || 'N/A'}</span>
                        )}
                    </div>

                    {/* Phone */}
                    <div className="flex items-center space-x-4">
                        <MdPhone className="text-indigo-500" />
                        {isEditing ? (
                            <input
                                type="tel"
                                name="phone"
                                value={user.phone || ''}
                                onChange={handleChange}
                                className="w-full p-3 border-b-2 border-gray-500 bg-gray-800 text-white focus:outline-none focus:border-indigo-600 rounded-lg"
                                placeholder="Phone"
                            />
                        ) : (
                            <span className="text-white">{user.phone || 'N/A'}</span>
                        )}
                    </div>

                    {/* Location */}
                    <div className="flex items-center space-x-4">
                        <MdLocationOn className="text-indigo-500" />
                        {isEditing ? (
                            <input
                                type="text"
                                name="location"
                                value={user.location || ''}
                                onChange={handleChange}
                                className="w-full p-3 border-b-2 border-gray-500 bg-gray-800 text-white focus:outline-none focus:border-indigo-600 rounded-lg"
                                placeholder="Location"
                            />
                        ) : (
                            <span className="text-white">{user.location || 'N/A'}</span>
                        )}
                    </div>
                </div>

                {/* Confirm/Save Changes Button */}
                {isEditing && (
                    <div className="mt-8 flex justify-center space-x-4">
                        <button
                            onClick={handleSaveChanges}
                            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
                        >
                            Save Changes
                        </button>
                        <button
                            onClick={handleDeleteAccount}
                            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                        >
                            Delete Account
                        </button>
                    </div>
                )}

                {/* Error Message */}
                {errorMessage && (
                    <p className="text-red-500 text-center mt-4">{errorMessage}</p>
                )}
            </div>

            {/* Confirm Save Changes Popup */}
            {showConfirmPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 text-gray-800">
                        <p className="mb-6">Are you sure you want to save changes?</p>
                        <div className="flex justify-between">
                            <button
                                onClick={confirmChanges}
                                className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={() => setShowConfirmPopup(false)}
                                className="bg-gray-600 text-white px-4 py-2 rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirm Delete Account Popup */}
            {showDeleteConfirmPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 text-gray-800">
                        <p className="mb-6">Are you sure you want to delete your account?</p>
                        <div className="flex justify-between">
                            <button
                                onClick={deleteAccount}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => setShowDeleteConfirmPopup(false)}
                                className="bg-gray-600 text-white px-4 py-2 rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileSettings;
