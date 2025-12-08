
import React from 'react'

const MovieCard = ({movie: {
    title,
    vote_average,
    poster_path,
    release_date,
    original_language
}}) => {
  return (
    <div className='movie-card'>
      <img 
        src={poster_path ? `https://image.tmdb.org/t/p/w342/${poster_path}` 
        : '/no-image-available.png'} 
        alt={title}
      />
      <div className='content-wrapper'>
        <h3>{title}</h3>
        <div className='content'>
          <div className='rating'>
            <span>⭐</span>
            <p>{vote_average?.toFixed(1)}</p>
          </div>
          <span className='year'>{release_date?.split('-')[0]}</span>
          <span className='lang'>{original_language}</span>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
