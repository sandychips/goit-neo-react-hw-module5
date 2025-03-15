import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation, Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieDetailsPage.module.css';

const API_KEY = import.meta.env.VITE_API_KEY;

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Ініціалізація useRef значенням location.state
  const backLinkLocationRef = useRef(location.state?.from || '/movies');

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=uk-UA`
        );
        setMovieDetails(response.data);
      } catch (error) {
        console.error('Помилка отримання деталей фільму:', error);
      }
    }
    fetchMovieDetails();
  }, [movieId]);

  const handleGoBack = () => {
    // Використовуємо значення зі збереженого useRef для навігації назад
    navigate(backLinkLocationRef.current);
  };

  if (!movieDetails) {
    return <div>Завантаження...</div>;
  }

  return (
    <div className={styles.container}>
      <button onClick={handleGoBack} className={styles.backButton}>
        Назад
      </button>
      <div className={styles.movieCard}>
        {movieDetails.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.title}
            className={styles.poster}
          />
        )}
        <div className={styles.info}>
          <h2 className={styles.title}>{movieDetails.title}</h2>
          <p className={styles.tagline}>{movieDetails.tagline}</p>
          <p className={styles.overview}>{movieDetails.overview}</p>
          <p>Рейтинг: {movieDetails.vote_average}</p>
          <p>Дата виходу: {movieDetails.release_date}</p>
        </div>
      </div>
      <div className={styles.detailsNav}>
        <Link 
          to={`/movies/${movieId}/cast`} 
          state={{ from: backLinkLocationRef.current }}
          className={({ isActive }) => isActive ? styles.activeLink : undefined}
        >
          Актори
        </Link>
        <Link 
          to={`/movies/${movieId}/reviews`} 
          state={{ from: backLinkLocationRef.current }}
          className={({ isActive }) => isActive ? styles.activeLink : undefined}
        >
          Відгуки
        </Link>
      </div>
      <div className={styles.detailsContent}>
        <Outlet />
      </div>
    </div>
  );
}

export default MovieDetailsPage;