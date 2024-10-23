'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image'; 
import Link from 'next/link'; 

const SearchPage = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('query');
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1); //Track the current page
    const [totalPages, setTotalPages] = useState(1); //Total number of pages for pagination
    const itemsPerPage = 5; //Limit to 5 movies per page

    useEffect(() => {
        console.log('Search query:', query); //Log the query to ensure it's being captured
        const fetchMovies = async () => {
            if (query) {
                setLoading(true); //Set loading to true when fetching data
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_MOVIE_API}/api/movies/q/search?query=${encodeURIComponent(query)}&page=${page}&limit=${itemsPerPage}`);
                    if (!response.ok) throw new Error('Network response was not ok');
                    const data = await response.json();
                    setMovies(data.movies); //Set movies to the array fetched
                    setTotalPages(data.totalPages); //Update total number of pages from the server
                } catch (error) {
                    console.error('Error fetching movies:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchMovies(); //Fetch all the movies for search
    }, [query, page]); //Trigger fetch whenever the query or page changes

    //Function to handle next page
    const handleNextPage = () => {
        setPage(prevPage => Math.min(prevPage + 1, totalPages)); //Prevent exceeding the last page
        scrollToTop(); //Scroll to top when "Next" is clicked
    };

    //Function to handle previous page
    const handlePreviousPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1)); // Prevent going below page 1
        scrollToTop(); //Scroll to top when "Previous" is clicked
    };

    //Function to scroll to the top of the screen
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    //Condition to check if movies haven't loaded yet (display placeholder)
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-800">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    //Check if no movies are returned by the search 
    if (!movies.length && !loading) {
        return (
            <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center p-6">
                {/* Message */}
                <h2 className="text-3xl font-bold text-indigo-600 mb-4">Oops! No Movies Found</h2>
                <p className="text-lg text-gray-300 mb-6">
                    It seems we couldn&apos;t find any movies for &quot;<span className="text-white">{query}</span>&quot;.
                </p>

                {/* Suggest going back to search */}
                <Link href="/">
                    <button className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition-transform duration-300 transform hover:scale-105">
                        Go Back Home
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-800 p-6">
            <h1 className="text-4xl font-extrabold text-center text-indigo-400 bg-gray-700 shadow-lg rounded-lg p-6 animate__animated animate__fadeIn animate__delay-1s mb-6 mt-20">
                Search Results for &quot;<span className="text-indigo-400 italic">{query}</span>&quot;
            </h1>

            <div className="w-full max-w-6xl mx-auto"> {/* Center the content horizontally */}
                <ul className="space-y-6">
                    {movies.map(movie => (
                        <Link key={movie._id} href={`/movies/${movie._id}`}>
                            <li
                                className="border-b py-4 flex items-center transition-transform duration-300 hover:scale-105 hover:bg-gray-700 hover:shadow-lg cursor-pointer transform-gpu"
                            >
                                {/* Movie Poster with Fixed Size */}
                                <div className="mr-6">
                                    {movie.poster ? (
                                        <Image
                                            src={movie.poster}
                                            alt={`Poster of ${movie.title}`}
                                            width={120}
                                            height={180}
                                            className="rounded ml-3"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-[120px] h-[180px] bg-gray-600 rounded ml-3 flex items-center text-center justify-center" >
                                            <p className='text-white'>No poster found!</p>
                                        </div>
                                    )}
                                </div>

                                {/* Movie Info Section */}
                                <div className="flex-grow">
                                    <h2 className="text-xl font-semibold text-white">{movie.title}</h2>
                                    <p className="text-gray-300 text-sm">{movie.plot}</p>
                                </div>
                            </li>
                        </Link>
                    ))}
                </ul>

                {/* Pagination controls */}
                <div className="flex justify-between mt-6">
                    {/* Conditionally render the "Previous" button only if not on the first page */}
                    {page > 1 && (
                        <button
                            onClick={handlePreviousPage}
                            className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-600 transition-transform duration-300 transform hover:scale-105 mb-4"
                        >
                            Previous
                        </button>
                    )}
                    <div className="flex-grow"></div> {/* Spacer to push the "Next" button to the right */}
                    {/* Conditionally render the "Next" button only if there are more pages */}
                    {page < totalPages && (
                        <button
                            onClick={handleNextPage}
                            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition-transform duration-300 transform hover:scale-105 mb-4"
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

// Wrap SearchPage in Suspense boundary
const SearchPageWrapper = () => (
    <Suspense fallback={<div>Loading...</div>}>
        <SearchPage />
    </Suspense>
);

export default SearchPageWrapper;