'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { getToken } from '@/lib/authenticate';

export default function MovieDetails({ params }) {
  const { id } = params; // Extract the movie id from the params
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();

  const token = getToken();

  useEffect(() => {
    
    if (id) {
      {/* TESTING WITH AXIOS LIBRARY */}
      axios
        .get(`${process.env.MOVIE_API}/api/movies/${id}`)
        .then((response) => {
          setMovie(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(`Error fetching movie details: ${error}`);
          setLoading(false);
          setError('Could not load movie details. Please try again.');
        });
      
      //Check if the movie is already in the user's favorites
      if (token) {
        axios
          .get(`${process.env.USER_API}/api/users/favorites`, {
            headers: { Authorization: `jwt ${token}` },
          })
          .then((response) => {
            // Convert ID to ObjectId if necessary
            const favoriteMovies = response.data.map(String); //Ensure the IDs are strings
            if (favoriteMovies.includes(id)) {
              setIsFavorite(true);
            }
          })
          .catch((error) => {
            console.error('Error checking favorites:', error);
          });
      }
    }
  }, [id]); //listen for id change

  const addToFavorites = () => {

    //check if user is not logged in
    if (!token) {
      router.push('/login');
      return;
    }

    axios
      .post(
        `${process.env.USER_API}/api/users/favorites/${id}`,
        {},
        {
          headers: { Authorization: `jwt ${token}` },
        }
      )
      .then((response) => {
        console.log('Movie added to favorites:', response.data);
        setIsFavorite(true);
      })
      .catch((error) => {
        console.error('Error adding movie to favorites:', error);
      });
  };

  const removeFromFavorites = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    axios
      .delete(`${process.env.USER_API}/api/users/favorites/${id}`, {
        headers: { Authorization: `jwt ${token}` },
      })
      .then((response) => {
        console.log('Movie removed from favorites:', response.data);
        setIsFavorite(false);
      })
      .catch((error) => {
        console.error('Error removing movie from favorites:', error);
      });
  };

  //if in loading state display placeholder
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-800">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  //if error loading movie then display error message
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-800">
        <p className="text-4xl font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 p-6 font-sans">
      {movie ? (
        <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-12 mt-20">
          {/* Movie Poster */}
          <div className="w-full md:w-1/3">
            {movie.poster ?           
              <img
              src={movie.poster}
              alt={movie.title}
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            /> : 
            <div className=" h-[650px] bg-gray-600 rounded-lg object-cover shadow-lg ml-3 flex items-center text-center justify-center" >
                <p className='text-white'>No poster found!</p>
            </div>
            }
          </div>

          {/* Movie Details */}
          <div className="w-full md:w-2/3 space-y-6">
            {/* Movie Title and Plot */}
            <div>
              <h1 className="text-5xl font-bold mb-2 font-serif text-white">
                {movie.title}
              </h1>
              <p className="text-lg text-gray-300 mt-4">{movie.fullplot || movie.plot}</p>
            </div>


            {/* Favorite Button */}
            <div className="flex justify-center md:justify-start">
              {!token ? (
                <button
                  onClick={() => router.push('/login')}
                  className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300"
                >
                  Login to Add to Favorites
                </button>
              ) : !isFavorite && token ? (
                <button
                  onClick={addToFavorites}
                  className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300"
                >
                  Add to Favorites
                </button>
              ) : (
                <button
                  onClick={removeFromFavorites}
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
                >
                  Remove from Favorites
                </button>
              )}
            </div>

            {/* Horizontal line */}
            <hr className="border-gray-300 my-6" />

            {/* Metadata */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12">
              {/* Details */}
              <div className="w-full md:w-1/2 space-y-4">
                <h2 className="text-2xl font-semibold font-serif text-white">Details</h2>
                <p className="text-gray-300"><strong>Genres:</strong> {Array.isArray(movie.genres) ? movie.genres.join(', ') : 'N/A'}</p>
                <p className="text-gray-300"><strong>Runtime:</strong> {movie.runtime ? `${movie.runtime} mins` : 'N/A'}</p>
                <p className="text-gray-300"><strong>Rated:</strong> {movie.rated || 'N/A'}</p>
                <p className="text-gray-300"><strong>Release Date:</strong> {movie.released ? new Date(movie.released).toDateString() : 'N/A'}</p>
                <p className="text-gray-300"><strong>Country:</strong> {Array.isArray(movie.countries) ? movie.countries.join(', ') : 'N/A'}</p>
              </div>

              {/* Crew */}
              <div className="w-full md:w-1/2 space-y-4">
                <h2 className="text-2xl font-semibold font-serif text-white">Crew</h2>
                <p className="text-gray-300"><strong>Directors:</strong> {Array.isArray(movie.directors) ? movie.directors.join(', ') : 'N/A'}</p>
                <p className="text-gray-300"><strong>Writers:</strong> {Array.isArray(movie.writers) ? movie.writers.join(', ') : 'N/A'}</p>
                <p className="text-gray-300"><strong>Cast:</strong> {Array.isArray(movie.cast) ? movie.cast.join(', ') : 'N/A'}</p>
              </div>
            </div>

            {/* Horizontal line */}
            <hr className="border-gray-300 my-6" />

            {/* IMDb and Rotten Tomatoes Ratings */}
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-12">
              {/* IMDb and Awards */}
              <div className="w-full md:w-1/2 space-y-4">
                <h2 className="text-2xl font-semibold font-serif text-white">Ratings & Awards</h2>
                <p className="text-gray-300"><strong>IMDb Rating:</strong> {movie.imdb?.rating || 'N/A'} / 10</p>
                <p className="text-gray-300"><strong>IMDb Votes:</strong> {movie.imdb?.votes || 'N/A'}</p>
                <p className="text-gray-300"><strong>Awards:</strong> {movie.awards?.text || 'No awards available'}</p>
              </div>

              {/* Rotten Tomatoes */}
              {movie.tomatoes && (
                <div className="w-full md:w-1/2 space-y-4">
                  <h2 className="text-2xl font-semibold font-serif text-white">Rotten Tomatoes</h2>
                  <p className="text-gray-300"><strong>Viewer Rating:</strong> {movie.tomatoes.viewer?.rating || 'N/A'}</p>
                  <p className="text-gray-300"><strong>Reviews:</strong> {movie.tomatoes.viewer?.reviews || 'N/A'}</p>
                  <p className="text-gray-300"><strong>Meter:</strong> {movie.tomatoes.viewer?.meter ? `${movie.tomatoes.viewer.meter}%` : 'N/A'}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-lg text-white">Movie not found!</p>
      )}
    </div>
  );
}