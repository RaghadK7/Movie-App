import React, { useState } from 'react'

const MovieDetails = () => {
     const [overView , setoverView]= useState('')
     const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${VITE_TMBD_API_KEY}`);
     const data = await res.json();
     const { title, vote_average, poster_path, release_date, original_language, id, cast } = movie
  return (
    <div className = "movie-card" >MovieDetails
  
  <h1>{overView}</h1>
   

    </div>
  )
}

export default MovieDetails