import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingNav.module.css';

export default function LandingNav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>Investify</div>
      <div className={styles.links}>
        <Link to="/login" className={styles.link}>Login</Link>
        <Link to="/signup" className={styles.link}>Sign Up</Link>
      </div>
    </nav>
  );
}
