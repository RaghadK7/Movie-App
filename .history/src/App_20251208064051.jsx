import React, { useEffect, useState } from 'react'
import { useDebounce } from 'react-use'
import Search from './components/Search'
import Navbar from './components/Navbar'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'
import { getTrendingMovies, updateSearchTermCount } from './appwrite'

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMBD_API_KEY

const App = () => {
  const [searchTerm, setsearchTerm] = useState('')
  const [errorMsg, seterrorMsg] = useState('')
  const [movies, setMovies] = useState([])
  const [trendingMovies, setTrendingMovies] = useState ([])
  const [loading, setLoading] = useState(false)
  const [debouncedSearchTerm, setDebouncedSearchTerm] =useState("")

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])
  const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  }

  const fetchMovies = async (query = '') => {
    setLoading(true)
    seterrorMsg('')

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

      const response = await fetch(endpoint, API_OPTIONS)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      setMovies(data.results || [])
      if(query && data.results.length >0){
        await updateSearchTermCount(query,data.results[0])
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`)
      seterrorMsg('Failed to fetch movies. Please try again later.')
    } finally {
      setLoading(false)
    }
  }
 
  const loadTrendingMovies = async() =>{
    try{
   const movies= await getTrendingMovies()
   setTrendingMovies(movies)

    }catch(error){
      console.error(`Error fetching trending movies: ${error}`)

    }
  }
useEffect(() => {
  if (debouncedSearchTerm.trim() !== '') {
    fetchMovies(debouncedSearchTerm)
  } else {
    fetchMovies()
  }
}, [debouncedSearchTerm])


useEffect (() =>{
  loadTrendingMovies()
},[])


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

        {trendingMovies.length> 0 && (
          <section className='trending'>
            <h2>Trending Movies</h2>

           <ul>
            {trendingMovies.map((movie, index)=>(
              <li key={movie.$id}>
                <p>{index + 1}</p>
                <img src="{movie.poster_url}" alt="{movie.title}" />

              </li>
            )

          )}
           </ul>
          </section>
        )}

        <section className='all-movies'>
          <h2 >All Movies</h2>

          {loading ? (
           <Spinner />
          ) : errorMsg ? (
            <p className='text-red-500'>{errorMsg}</p>
          ) :(
            <ul  className='all-movies '>
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
