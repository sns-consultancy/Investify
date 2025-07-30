import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.homeWrapper}>
      <header className={styles.homeHeader}>
        <h1>
          Welcome to <span className={styles.highlight}>Investify</span>
        </h1>
        <p>Your AI-powered investment assistant</p>
        <div className={styles.homeActions}>
          <Link to="/signup" className={styles.actionButton}>Sign Up</Link>
          <Link to="/login" className={styles.actionButton}>Login</Link>
          <Link to="/chat" className={styles.actionButton}>Chatbot</Link>
        </div>
      </header>
      <section className={styles.homeFeatures}>
        <ul>
          <li>Track your investments in real time</li>
          <li>AI-driven stock analysis</li>
          <li>Personalized insights for smarter decisions</li>
        </ul>
      </section>
    </div>
  );
}