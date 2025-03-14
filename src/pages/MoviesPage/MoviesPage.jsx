import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';

const API_KEY = import.meta.env.VITE_API_KEY;

function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function searchMovies() {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=uk-UA&query=${searchQuery}&include_adult=false`
        );
        setSearchResults(response.data.results);
      } catch (error) {
        console.error('Помилка пошуку фільмів:', error);
      }
    }

    const delayDebounceFn = setTimeout(() => {
      searchMovies();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleInputChange = event => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className={styles.container}>
      <h1>Пошук фільмів</h1>
      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="Введіть назву фільму"
          value={searchQuery}
          onChange={handleInputChange}
          className={styles.input}
        />
      </div>
      {searchResults && searchResults.length > 0 && <MovieList movies={searchResults} />}
      {searchQuery.trim() && searchResults.length === 0 && <p>Нічого не знайдено за запитом "{searchQuery}".</p>}
    </div>
  );
}

export default MoviesPage;