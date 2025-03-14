import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Navigation />
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2025 Kino-Vino-Domino</p>
      </footer>
    </div>
  );
}

export default App;