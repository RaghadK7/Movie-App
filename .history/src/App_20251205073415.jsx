import React, { use, useEffect,useState } from 'react'
import Search from './components/Search'

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMBD_API_KEY
const App = () => {
  const [searchTerm, setsearchTerm] = useState('')
  const [ErrorMsg, setErrorMsg] = useState('')
  const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  }
  const fetchMovies = async (query) => {
    try {

    }
    catch (error) {
      console.error(`Error fetching movies: ${error}`)
      setErrorMsg('Failed to fetch movies. Please try again later.')
    }
  }
  useEffect(() => {

  }, [searchTerm])

  return (
    <main>
      <div className='pattern'/>
      <div className='wrapper'>
        <header>
          <img src='/hero.png' alt='hero' />
          <h1> Find <span className='text-gradient'> Movies</span> You'll Enjoy Without the Hassle</h1>
          <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm}/>
          <h1 className='text-white'> {searchTerm}</h1>
        </header>

        
      </div>
  </main>
  )
}

export default App