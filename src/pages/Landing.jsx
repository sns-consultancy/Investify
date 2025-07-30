import React from "react";
import { Link } from "react-router-dom";
import styles from "./Landing.module.css";

export default function Landing() {
  return (
    <div className={styles.landingWrapper}>
      <section className={styles.hero}>
        <h1>Welcome to Investify</h1>
        <p>Your <strong>AI-powered investment assistant</strong> – anytime, anywhere.</p>
        <div className={styles.cta}>
          <Link to="/signup" className={styles.btnPrimary}>Sign Up</Link>
          <Link to="/login" className={styles.btnSecondary}>Login</Link>
        </div>
      </section>

      <section className={styles.features}>
        <h2>🚀 Explore What You Can Do</h2>
        <ul>
          <li>📈 Track your investment portfolio in real time</li>
          <li>🤖 Analyze stock trends with AI</li>
          <li>💬 Chat with our smart AI assistant</li>
          <li>📊 Get personalized recommendations</li>
        </ul>
      </section>

      <section className={styles.footerLinks}>
        <p><Link to="/chat">Open Chatbot</Link></p>
        <p>
          <Link to="/about">About</Link> | <Link to="/contact">Contact</Link> | 
          <Link to="/terms">Terms</Link> | <Link to="/privacy">Privacy</Link>
        </p>
        <p>© 2025 Investify. All rights reserved.</p>
      </section>
    </div>
  );
}