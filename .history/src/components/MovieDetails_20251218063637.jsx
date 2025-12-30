import React from 'react'

const MovieDetails = () => {
      
      const { title, vote_average, poster_path, release_date, original_language, id, cast } = movie
  return (
    <div className = "movie-card" >MovieDetails
  <img 
          src={poster_path ? `https://image.tmdb.org/t/p/w342/${poster_path}` 
          : '/no-image-available.png'}
          alt={title}
        /> 



    </div>
  )
}

export default MovieDetails