import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';

const API_KEY = import.meta.env.VITE_API_KEY;

function HomePage() {
  const [popularMovies, setPopularMovies] = useState();

  useEffect(() => {
    async function fetchPopularMovies() {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=uk-UA&page=1`
        );
        setPopularMovies(response.data.results);
      } catch (error) {
        console.error('Помилка отримання популярних фільмів:', error);
      }
    }

    fetchPopularMovies();
  },);

  return (
    <div className={styles.container}>
      <h1>Популярні фільми</h1>
      <MovieList movies={popularMovies} />
    </div>
  );
}

export default HomePage;