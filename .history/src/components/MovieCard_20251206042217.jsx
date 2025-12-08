import React from 'react'

const MovieCard = ({movie: {
    title , vote_average, poster_path, release_date, original_language
}}) => {
  return (
    <div className='all-movies-card'>
        < img 
          src={poster_path ? `https://image.tmdb.org/t/p/w342/${poster_path}` 
          : '/no-image-available.png'} />
        
    </div>
  )
}

export default MovieCard