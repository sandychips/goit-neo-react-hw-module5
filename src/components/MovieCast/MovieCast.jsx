import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieCast.module.css';

const API_KEY = import.meta.env.VITE_API_KEY;

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCast() {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=uk-UA`
        );
        setCast(response.data.cast || []);
      } catch (error) {
        console.error('Помилка отримання акторського складу:', error);
        setError('Не вдалося завантажити інформацію про акторів');
      } finally {
        setLoading(false);
      }
    }

    fetchCast();
  }, [movieId]);

  if (loading) {
    return <div>Завантаження акторського складу...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  // Check if cast exists and has items
  if (!cast || cast.length === 0) {
    return <p className={styles.noCast}>Інформація про акторський склад відсутня</p>;
  }

  return (
    <div className={styles.container}>
      <ul className={styles.castList}>
        {cast.map(actor => (
          <li key={actor.id} className={styles.castItem}>
            {actor.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                className={styles.actorImage}
              />
            ) : (
              <div className={styles.noImage}>Немає фото</div>
            )}
            <div className={styles.actorInfo}>
              <h4 className={styles.actorName}>{actor.name}</h4>
              <p className={styles.character}>{actor.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieCast;