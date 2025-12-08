import React from 'react'

const MovieCard = ({movie: {
    title,
    vote_average,
    poster_path,
    release_date,
    original_language
}}) => {
  return (
    <li className='movie-card'>
      <img 
        src={poster_path ? `https://image.tmdb.org/t/p/w342/${poster_path}` 
        : '/no-image-available.png'}
        alt={title}
        loading="lazy"
      />
      <h3>{title}</h3>
      <div className='content'>
        <div className='rating'>
          <img src="/star.png" alt="rating" />
          <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
        </div>
        <span className='year'>{release_date ? release_date.split('-')[0] : 'N/A'}</span>
        <span className='lang'>{original_language}</span>
      </div>
    </li>
  )
}

export default MovieCard