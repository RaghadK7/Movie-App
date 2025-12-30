import React from 'react'

const MovieDetails = () => {
  return (
    <div>MovieDetails
  <img 
          src={poster_path ? `https://image.tmdb.org/t/p/w342/${poster_path}` 
          : '/no-image-available.png'}
          alt={title}
        /> 



    </div>
  )
}

export default MovieDetails