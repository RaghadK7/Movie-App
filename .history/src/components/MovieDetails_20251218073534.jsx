import React, { useState, useEffect } from 'react'

const MovieDetails = ({ movie, movieId, VITE_TMBD_API_KEY }) => {
    
     const { title, vote_average, poster_path, release_date, original_language, id, cast } = movie
      const [overView , setoverView]= useState('')
      async function getMovie() {
     const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${VITE_TMBD_API_KEY}`);
     const data = await res.json();
     setoverView (data.overview)
      }

  return (
    <div className="movie-card">
      <h1>MovieDetails</h1>
      <h1>{overView}</h1>
    </div>
  )
}

export default MovieDetails