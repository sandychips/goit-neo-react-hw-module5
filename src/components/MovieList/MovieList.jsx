import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';

function MovieList({ movies }) {
  const location = useLocation();

  // Check if movies exists and is an array
  if (!movies || !Array.isArray(movies) || movies.length === 0) {
    return <p>No movies available to display</p>;
  }

  return (
    <ul className={styles.list}>
      {movies.map(movie => (
        <li key={movie.id} className={styles.listItem}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className={styles.poster}
              />
            ) : (
              <div className={styles.noPoster}>No Image Available</div>
            )}
            <h3 className={styles.title}>{movie.title || movie.name}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;