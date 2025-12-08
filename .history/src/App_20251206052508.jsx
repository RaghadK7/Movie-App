import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import Navbar from './components/Navbar'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMBD_API_KEY

const App = () => {
  const [searchTerm, setsearchTerm] = useState('')
  const [errorMsg, seterrorMsg] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)

  const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  }

  const fetchMovies = async (query) => {
    setLoading(true)
    seterrorMsg('')

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${query}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

      const response = await fetch(endpoint, API_OPTIONS)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      setMovies(data.results || [])
    } catch (error) {
      console.error(`Error fetching movies: ${error}`)
      seterrorMsg('Failed to fetch movies. Please try again later.')
    } finally {
      setLoading(false)
    }
  }
 
  
  useEffect(() => {
    fetchMovies()
  }, [])

 
  useEffect(() => {
    if (searchTerm.trim() !== '') {
      fetchMovies(searchTerm)
    }
  }, [searchTerm])

  return (
    <main>
      <Navbar />
      <div className='pattern'/>
      <div className='wrapper'>
        <header>
          <img src='/hero.png' alt='hero' />
          <h1> Find <span className='text-gradient'> Movies</span> You'll Enjoy Without the Hassle</h1>
          
          <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} />

        </header>

        <section className='All-movies'>
          <br/>
          <h2 className='mt-[40px] text-color'>All Movies</h2>

          {loading ? (
           <Spinner />
          ) : errorMsg ? (
            <p className='text-red-500'>{errorMsg}</p>
          ) :(
            <ul >
              
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
