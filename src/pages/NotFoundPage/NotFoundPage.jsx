import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

function NotFoundPage() {
  return (
    <div className={styles.container}>
      <h1>404 - Сторінку не знайдено</h1>
      <p>Вибачте, але запитувану сторінку не знайдено.</p>
      <Link to="/" className={styles.link}>
        Перейти на головну сторінку
      </Link>
    </div>
  );
}

export default NotFoundPage;