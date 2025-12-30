import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const DEFAULT_TRAILER = "https://www.youtube.com/embed/dQw4w9WgXcQ";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setErrorMsg("");
      try {
        const res = await fetch(`${API_BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setMovie(data);

        const castRes = await fetch(`${API_BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
        if (!castRes.ok) throw new Error(`HTTP error! status: ${castRes.status}`);
        const castData = await castRes.json();
        setCast(castData.cast.slice(0, 8));

        const trailerRes = await fetch(`${API_BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
        if (!trailerRes.ok) throw new Error(`HTTP error! status: ${trailerRes.status}`);
        const trailerData = await trailerRes.json();
        const youtubeTrailer = trailerData.results.find(v => v.type === "Trailer" && v.site === "YouTube");
        setTrailer(youtubeTrailer ? `https://www.youtube.com/embed/${youtubeTrailer.key}` : DEFAULT_TRAILER);
      } catch (error) {
        console.error(error);
        setErrorMsg("Failed to fetch movie details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <p className="text-white text-center mt-20">Loading...</p>;
  if (errorMsg) return <p className="text-red-500 text-center mt-20">{errorMsg}</p>;
  if (!movie) return null;

  return (
    <div className="relative min-h-screen">
      <div
        className="pattern absolute top-0 left-0 w-full h-full opacity-30 z-0"
        style={{ backgroundImage: 'url("/hero-bg.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <div className="wrapper relative z-10 flex flex-col gap-10 text-white">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="rounded-xl shadow-lg md:w-1/4"
          />
          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            <p className="text-yellow-400 font-bold text-lg">
              Rating: {movie.vote_average} / 10
            </p>
            <p className="text-gray-200">{movie.overview}</p>
            <div className="w-full aspect-video rounded-lg overflow-hidden shadow-lg mt-4">
              <iframe
                src={trailer}
                title="Movie Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Cast</h2>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar">
            {cast.map(actor => (
              <div key={actor.cast_id} className="flex-shrink-0 w-28 flex flex-col items-center">
                <img
                  src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : '/placeholder.png'}
                  alt={actor.name}
                  className="w-24 h-32 object-cover rounded-lg mb-2"
                />
                <p className="text-center text-sm">{actor.name}</p>
                <p className="text-center text-gray-300 text-xs">{actor.character}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
