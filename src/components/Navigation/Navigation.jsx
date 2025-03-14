import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

function Navigation() {
  return (
    <nav className={styles.nav}>
      <NavLink to="/" className={({ isActive }) => isActive ? styles.active : undefined}>
        Головна
      </NavLink>
      <NavLink to="/movies" className={({ isActive }) => isActive ? styles.active : undefined}>
        Фільми
      </NavLink>
    </nav>
  );
}

export default Navigation;