import React, { use, useEffect,useState } from 'react'
import Search from './components/Search'

const API_BASE_URL = 'https://api.themoviedb.org/3'
const App = () => {
  const [searchTerm, setsearchTerm] = useState('')
  
  useEffect(() => {

  }, [searchTerm])

  return (
    <main>
      <div className='pattern'/>
      <div className='wrapper'>
        <header>
          <img src='/hero.png' alt='hero' />
          <h1> Find <span className='text-gradient'> Movies</span> You'll Enjoy Without the Hassle</h1>
        </header>

        <Search searchTerm={searchTerm} setsearchTerm={setsearchTerm}/>
          <h1 className='text-white'> {searchTerm}</h1>
      </div>
  </main>
  )
}

export default App