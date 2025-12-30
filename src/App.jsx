import React, { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import { useNavigate, Route, Routes } from 'react-router-dom'
import Search from './components/Search'
import Navbar from './components/Navbar'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'
import MovieDetails from './components/MovieDetails'
import { getTrendingMovies, updateSearchTermCount } from './appwrite'
import Footer from './components/Footer'

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const App = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [movies, setMovies] = useState([])
  const [trendingMovies, setTrendingMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

  const fetchMovies = async (query = '') => {
    setLoading(true)
    setErrorMsg('')
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`

      const res = await fetch(endpoint)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

      const data = await res.json()
      setMovies(data.results || [])

      if (query && data.results.length > 0) {
        await updateSearchTermCount(query, data.results[0])
      }
    } catch (error) {
      console.error('Error fetching movies:', error)
      setErrorMsg('Failed to fetch movies. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies()
      setTrendingMovies(movies)
    } catch (error) {
      console.error('Error fetching trending movies:', error)
    }
  }

  useEffect(() => {
    if (debouncedSearchTerm.trim() !== '') {
      fetchMovies(debouncedSearchTerm)
    } else {
      fetchMovies()
    }
  }, [debouncedSearchTerm])

  useEffect(() => {
    loadTrendingMovies()
  }, [])

  const handleClick = (movieId) => {
    navigate(`/movieDetails/${movieId}`)
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <main>
            <Navbar />
            <div className="pattern" />
            <div className="wrapper">
              <header>
                <img src="/hero.png" alt="hero" />
                <h1>
                  Find <span className="text-gradient"> Movies</span> You'll Enjoy Without the Hassle
                </h1>
                <Search searchTerm={searchTerm} setsearchTerm={setSearchTerm} />
              </header>

              {trendingMovies.length > 0 && (
                <section className="trending">
                  <h2>Trending Movies</h2>
                  <ul>
                    {trendingMovies.map((movie, index) => (
                      <li key={movie.$id} onClick={() => handleClick(movie.id)}>
                        <p>{index + 1}</p>
                        <img src={movie.poster_url} alt={movie.title} />
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section className="all-movies">
                <h2>All Movies</h2>
                {loading ? (
                  <Spinner />
                ) : errorMsg ? (
                  <p className="text-red-500">{errorMsg}</p>
                ) : (
                  <ul className="all-movies">
                    {movies.map((movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    ))}
                  </ul>
                )}
              </section>
            </div>
             <Footer />
          </main>
          
        }
      />
      <Route path="/movieDetails/:id" element={<MovieDetails />} />
     
    </Routes>
    
  )
}

export default App
