import React from 'react'

const MovieCard = ({movie: {
    title , vote_average, poster_path, release_date, original_language
}}) => {
  return (
    <li className="movie-card">
        <img 
          src={poster_path ? `https://image.tmdb.org/t/p/w342/${poster_path}` 
          : '/no-image-available.png'}
          alt={title}
        />
    </li>
  )
}

export default MovieCard