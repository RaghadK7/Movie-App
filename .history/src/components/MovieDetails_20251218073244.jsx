import React, { useState } from 'react'

const MovieDetails = () => {
    
     const { title, vote_average, poster_path, release_date, original_language, id, cast } = movie
      const [overView , setoverView]= useState('')
      async function getMovie {
     const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${VITE_TMBD_API_KEY}`);
     const data = await res.json();
     setoverView (data.overview)
      }

  return (
    <div className = "movie-card" >MovieDetails
  
  <h1>{overView}</h1>
   

    </div>
  )
}

export default MovieDetails