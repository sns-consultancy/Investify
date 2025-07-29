import React from "react";
import { Link } from "react-router-dom";
import "./Landing.module.css";
 
export default function Landing() {
  return (
    <div className="landing">
      <header className="hero">
        <h1>Welcome to Investify</h1>
        <p>Your AI-powered investment assistant – anytime, anywhere.</p>
        <div className="cta-buttons">
          <Link to="/signup" className="btn">Sign Up</Link>
          <Link to="/login" className="btn btn-outline">Login</Link>
        </div>
      </header>
 
      <section className="features">
        <h2>Explore What You Can Do:</h2>
        <ul>
          <li>📈 Track your investment portfolio in real time</li>
          <li>🤖 Analyze stock trends with AI</li>
          <li>🧠 Chat with our smart AI investment assistant</li>
          <li>📊 Get personalized investment recommendations</li>
        </ul>
      </section>
 
      <section className="chatbot-cta">
        <h2>Need Help Now?</h2>
        <p>Try our 24/7 AI-powered <strong>InvestChatbot</strong> for instant insights.</p>
        <Link to="/investchatbot" className="btn btn-chat">Open Chatbot</Link>
      </section>
 
      <footer className="footer">
        <div className="links">
          <Link to="/about">About</Link> |
          <Link to="/contact">Contact</Link> |
          <Link to="/terms">Terms</Link> |
          <Link to="/privacy">Privacy</Link>
        </div>
        <p>© 2025 Investify. All rights reserved.</p>
      </footer>
    </div>
  );
}