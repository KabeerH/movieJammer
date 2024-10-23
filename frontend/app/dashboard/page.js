'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getToken } from '@/lib/authenticate';

export default function Dashboard() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const token = getToken()

  useEffect(() => {
    
    //if user is not logged in then redirect them
    if (!token) {
      router.push('/login');
      return;
    }

    {/* TESTING WITH AXIOS LIBRARY */}
    axios
      .get(`${process.env.NEXT_PUBLIC_USER_API}/api/users/favorites`, {
        headers: { Authorization: `jwt ${token}` }
      })
      .then((response) => {
        const movieIds = response.data;
        if (movieIds.length > 0) {
          const movieDetailsPromises = movieIds.map((movieId) =>
            axios.get(`${process.env.NEXT_PUBLIC_MOVIE_API}/api/movies/${movieId}`)
          );
          Promise.all(movieDetailsPromises)
            .then((movieDetailsResponse) => {
              setFavorites(movieDetailsResponse.map((res) => res.data));
              setLoading(false);
            })
            .catch((error) => {
              console.error('Error fetching favorite movies details:', error);
              setError('Error loading movie details.');
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching favorite movie IDs:', error);
        setError('Error loading favorite movie IDs.');
        setLoading(false);
      });
  }, [router]); //listen for router changes

  //if dashboard is still loading movies
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-800">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  //if there is a error display it to the user
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-800">
        <p className="text-4xl font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 p-6 font-sans">
      {favorites.length > 0 ? (
        <div className="space-y-8 mt-20">
            <h1 className="text-4xl font-extrabold text-center text-indigo-400 bg-gray-700 shadow-lg rounded-lg p-6 mb-6 mt-20 italic">
              Your favorite movies
            </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {favorites.map((movie) => (
              <Link key={movie._id} href={`https://movie-jammer.vercel.app/${movie._id}`} passHref>
                <div className="bg-gray-900 p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out flex flex-col h-full">
                  <div className="h-80 w-full mb-6">
                    <img
                      src={movie.poster} 
                      alt={movie.title || 'Untitled Movie'} 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <h2 className="text-2xl font-semibold text-white mb-2">
                    {movie.title || 'Untitled Movie'}
                  </h2>
                  <p className="text-gray-300 flex-1">
                    {movie.plot || 'No plot available'} 
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen bg-gray-800">
          <div className="text-center">
            <p className="text-3xl font-semibold text-white mb-4">No Favorite Movies Yet!</p>
            <p className="text-lg text-gray-300 mb-6">
                It looks like you haven&apos;t added any movies to your favorites. Start exploring and add some!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}