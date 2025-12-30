import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const DEFAULT_TRAILER = "https://www.youtube.com/embed/dQw4w9WgXcQ";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [showFullOverview, setShowFullOverview] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);

  const handleSignUp = () => {
    if (email && userName) {
      setIsLoggedIn(true);
      setShowSignUp(false);
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setEmail('');
  };

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
        setCast(castData.cast.slice(0, 10));
        
        const director = castData.crew.find(person => person.job === "Director");
        const writer = castData.crew.find(person => person.job === "Screenplay" || person.job === "Writer");
        setCrew([director, writer].filter(Boolean));

        const trailerRes = await fetch(`${API_BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
        if (!trailerRes.ok) throw new Error(`HTTP error! status: ${trailerRes.status}`);
        const trailerData = await trailerRes.json();
        const youtubeTrailer = trailerData.results.find(v => v.type === "Trailer" && v.site === "YouTube");
        setTrailer(youtubeTrailer ? `https://www.youtube.com/embed/${youtubeTrailer.key}` : DEFAULT_TRAILER);

        const similarRes = await fetch(`${API_BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`);
        if (similarRes.ok) {
          const similarData = await similarRes.json();
          setSimilarMovies(similarData.results.slice(0, 6));
        }
      } catch (error) {
        console.error(error);
        setErrorMsg("Failed to fetch movie details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading amazing content...</p>
        </div>
      </div>
    );
  }

  if (errorMsg) return <p className="text-red-500 text-center mt-20 text-xl">{errorMsg}</p>;
  if (!movie) return null;

  const overviewText = movie.overview || "No overview available.";
  const isLongOverview = overviewText.length > 300;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navbar - Same as your Navbar component */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-primary/80 backdrop-blur-md border-b border-light-100/5">
        <div className="px-5 sm:px-10 py-3 flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo with Back Button */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/')}
              className="text-light-200 hover:text-light-100 transition flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <div className="text-2xl font-bold text-gradient">Movies</div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            <a href="#" className="text-light-200 text-sm hover:text-light-100 transition">Home</a>
            <a href="#" className="text-light-200 text-sm hover:text-light-100 transition">My List</a>
            <a href="#" className="text-light-200 text-sm hover:text-light-100 transition">Browse</a>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-light-200/20 flex items-center justify-center text-light-100 text-xs font-bold">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-light-100 text-xs">{userName}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-light-200 hover:text-light-100 transition text-xs"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowSignUp(true)}
                className="px-5 py-1.5 bg-light-200 text-primary rounded-lg font-bold text-xs hover:bg-light-100 transition"
              >
                Sign Up
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-light-100 text-2xl"
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed inset-0 z-30 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      </div>

      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-primary/95 backdrop-blur-md border-r border-light-100/10 z-30 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="pt-20 px-6 flex flex-col h-full">
          <div className="flex flex-col gap-6 mb-8">
            <a href="#" onClick={() => setIsOpen(false)} className="text-light-200 hover:text-light-100 transition text-sm">Home</a>
            <a href="#" onClick={() => setIsOpen(false)} className="text-light-200 hover:text-light-100 transition text-sm">My List</a>
            <a href="#" onClick={() => setIsOpen(false)} className="text-light-200 hover:text-light-100 transition text-sm">Browse</a>
          </div>

          <div className="border-t border-light-100/10 my-6"></div>

          <div className="flex flex-col gap-3">
            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full bg-light-200/20 flex items-center justify-center text-light-100 text-xs font-bold">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-light-100 text-xs">{userName}</span>
                </div>
                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-light-200 hover:text-light-100 transition text-left text-xs">
                  Logout
                </button>
              </>
            ) : (
              <button onClick={() => { setShowSignUp(true); setIsOpen(false); }} className="w-full px-5 py-2 bg-light-200 text-primary rounded-lg font-bold text-xs hover:bg-light-100 transition">
                Sign Up
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sign Up Modal */}
      {showSignUp && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-dark-100 rounded-2xl p-8 max-w-md w-full border border-light-100/10">
            <h2 className="text-2xl font-bold text-white mb-6">Create Account</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-light-200 text-xs mb-2">Name</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Your name"
                  className="w-full bg-light-100/5 border border-light-100/20 rounded-lg px-4 py-2 text-light-100 placeholder-light-200 outline-hidden focus:border-light-200 transition text-sm"
                />
              </div>
              <div>
                <label className="block text-light-200 text-xs mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-light-100/5 border border-light-100/20 rounded-lg px-4 py-2 text-light-100 placeholder-light-200 outline-hidden focus:border-light-200 transition text-sm"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button onClick={() => setShowSignUp(false)} className="flex-1 px-4 py-2 border border-light-100/20 text-light-200 rounded-lg hover:bg-light-100/5 transition text-sm">
                  Cancel
                </button>
                <button onClick={handleSignUp} className="flex-1 px-4 py-2 bg-light-200 text-primary rounded-lg font-bold hover:bg-light-100 transition disabled:opacity-50 text-sm" disabled={!userName || !email}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content with padding for fixed navbar */}
      <div className="pt-16">
        {/* Hero Section with Backdrop */}
        <div className="relative">
          <div 
            className="absolute inset-0 opacity-30 bg-cover bg-center"
            style={{ 
              backgroundImage: movie.backdrop_path 
                ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` 
                : 'none'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/90 to-slate-900" />
          
          <div className="wrapper relative z-10 py-12">
            <div className="flex flex-col lg:flex-row gap-10 items-start">
              {/* Poster */}
              <div className="lg:w-1/3">
                <div className="relative group">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-3xl shadow-2xl w-full transform group-hover:scale-[1.02] transition-all duration-500"
                  />
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-purple-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Quick Stats Card */}
                <div className="mt-6 bg-gradient-to-br from-purple-900/40 to-slate-900/40 backdrop-blur-xl p-6 rounded-2xl border border-purple-500/20 shadow-xl">
                  <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                    <span className="text-2xl">📊</span> Quick Facts
                  </h3>
                  <div className="space-y-3 text-sm">
                    {movie.release_date && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Release Date</span>
                        <span className="text-white font-medium">{new Date(movie.release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                    )}
                    {movie.budget > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Budget</span>
                        <span className="text-white font-medium">${(movie.budget / 1000000).toFixed(0)}M</span>
                      </div>
                    )}
                    {movie.revenue > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Revenue</span>
                        <span className="text-green-400 font-medium">${(movie.revenue / 1000000).toFixed(0)}M</span>
                      </div>
                    )}
                    {movie.vote_count && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Total Votes</span>
                        <span className="text-white font-medium">{movie.vote_count.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Movie Info */}
              <div className="flex-1 flex flex-col gap-6">
                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold text-white mb-3 drop-shadow-2xl leading-tight">
                    {movie.title}
                  </h1>
                  {movie.tagline && (
                    <p className="text-purple-300 italic text-xl">&ldquo;{movie.tagline}&rdquo;</p>
                  )}
                </div>

                {/* Stats Bar */}
                <div className="flex flex-wrap gap-3 items-center">
                  <div className="bg-gradient-to-r from-yellow-500/30 to-orange-500/30 backdrop-blur-sm px-5 py-2.5 rounded-full border border-yellow-400/40 shadow-lg">
                    <span className="text-yellow-300 font-bold text-lg flex items-center gap-2">
                      ⭐ {movie.vote_average.toFixed(1)}
                      <span className="text-yellow-400/60 text-sm">/ 10</span>
                    </span>
                  </div>
                  {movie.runtime && (
                    <div className="bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full border border-white/20">
                      <span className="text-white font-medium">
                        ⏱️ {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                      </span>
                    </div>
                  )}
                  {movie.status && (
                    <div className="bg-green-500/20 backdrop-blur-sm px-5 py-2.5 rounded-full border border-green-400/30">
                      <span className="text-green-300 font-medium">
                        {movie.status}
                      </span>
                    </div>
                  )}
                </div>

                {/* Genres */}
                {movie.genres && movie.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map(genre => (
                      <span 
                        key={genre.id}
                        className="px-5 py-2 bg-gradient-to-r from-purple-600/40 to-pink-600/40 backdrop-blur-sm rounded-full text-purple-200 text-sm border border-purple-400/40 font-medium hover:scale-105 transition-transform cursor-default shadow-lg"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                {/* Crew */}
                {crew.length > 0 && (
                  <div className="flex flex-wrap gap-4">
                    {crew.map(person => (
                      <div key={person.id} className="bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-700/50">
                        <p className="text-gray-400 text-xs mb-1">{person.job}</p>
                        <p className="text-white font-semibold">{person.name}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Overview */}
                <div className="bg-gradient-to-br from-black/50 to-purple-900/30 backdrop-blur-xl p-8 rounded-3xl border border-purple-500/20 shadow-2xl">
                  <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                    <span className="text-4xl">📖</span> Overview
                  </h2>
                  <p className="text-gray-200 leading-relaxed text-lg">
                    {isLongOverview && !showFullOverview 
                      ? `${overviewText.substring(0, 300)}...` 
                      : overviewText
                    }
                  </p>
                  {isLongOverview && (
                    <button
                      onClick={() => setShowFullOverview(!showFullOverview)}
                      className="mt-4 text-purple-400 hover:text-purple-300 font-medium transition-colors flex items-center gap-2"
                    >
                      {showFullOverview ? 'Show less' : 'Read more'}
                      <svg className={`w-4 h-4 transition-transform ${showFullOverview ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Trailer */}
            <div className="mt-16">
              <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="text-5xl">🎬</span> Watch Trailer
              </h2>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-purple-500/30 hover:border-purple-500/50 transition-all group">
                <div className="aspect-video">
                  <iframe
                    src={trailer}
                    title="Movie Trailer"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>

            {/* Cast */}
            <div className="mt-16">
              <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-3">
                <span className="text-5xl">🎭</span> Cast
              </h2>
              <div className="flex gap-6 overflow-x-auto pb-6 hide-scrollbar">
                {cast.map(actor => (
                  <div 
                    key={actor.cast_id} 
                    className="flex-shrink-0 w-40 group cursor-pointer"
                  >
                    <div className="relative rounded-2xl overflow-hidden mb-3 shadow-2xl border-2 border-transparent group-hover:border-purple-500/50 transition-all">
                      <img
                        src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : '/placeholder.png'}
                        alt={actor.name}
                        className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-white font-bold text-sm mb-1 drop-shadow-lg">
                          {actor.name}
                        </p>
                        <p className="text-purple-300 text-xs drop-shadow-lg">
                          {actor.character}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Similar Movies */}
            {similarMovies.length > 0 && (
              <div className="mt-16">
                <h2 className="text-4xl font-bold text-white mb-8 flex items-center gap-3">
                  <span className="text-5xl">🍿</span> You Might Also Like
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                  {similarMovies.map(similar => (
                    <div
                      key={similar.id}
                      onClick={() => navigate(`/movieDetails/${similar.id}`)}
                      className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                    >
                      <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-transparent group-hover:border-purple-500/50">
                        <img
                          src={`https://image.tmdb.org/t/p/w300${similar.poster_path}`}
                          alt={similar.title}
                          className="w-full h-auto"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <p className="text-white font-bold text-sm mb-1">{similar.title}</p>
                            <p className="text-yellow-400 text-xs">⭐ {similar.vote_average.toFixed(1)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-purple-600 hover:bg-purple-500 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 z-40 border-2 border-purple-400/50"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
};

export default MovieDetails;