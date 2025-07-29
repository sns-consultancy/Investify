import React from "react";
import { Link } from "react-router-dom";
import AIChatbot from "../components/AIChatbot";
import "./Home.module.css";

export default function Home() {
  return (
    <div className="homeWrapper">
      <header className="homeHeader">
        <h1>Welcome to <span className="highlight">Investify</span></h1>
        <p>Your AI-powered investment assistant – anytime, anywhere.</p>
      </header>
      <section className="homeActions">
        <Link to="/signup" className="actionButton">Sign Up</Link>
        <Link to="/login" className="actionButton">Login</Link>
      </section>
      <section className="homeFeatures">
        <h2>What you can do:</h2>
        <ul>
          <li>💼 Track your investment portfolio in real time</li>
          <li>🤖 Analyze stock trends with AI</li>
          <li>🧠 Chat with our smart AI investment assistant</li>
          <li>📊 Get personalized recommendations</li>
        </ul>
      </section>
      <section className="homeChat">
        <h2>Try the AI Chatbot</h2>
        <AIChatbot />
      </section>
    </div>
  );
}
