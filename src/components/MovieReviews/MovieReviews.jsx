import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './MovieReviews.module.css';

const API_KEY = import.meta.env.VITE_API_KEY;

function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}&language=uk-UA`
        );
        setReviews(response.data.results);
      } catch (error) {
        console.error('Помилка отримання відгуків:', error);
      }
    }

    fetchReviews();
  }, [movieId]);

  return (
    <div className={styles.container}>
      <h2>Відгуки</h2>
      {reviews && reviews.length > 0 ? (
        <ul className={styles.list}>
          {reviews.map(review => (
            <li key={review.id} className={styles.listItem}>
              <h4 className={styles.author}>{review.author}</h4>
              <p className={styles.content}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Немає відгуків для цього фільму.</p>
      )}
    </div>
  );
}

export default MovieReviews;