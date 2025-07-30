import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <h1>Welcome to Investify</h1>
      <p>Your AI-powered investment assistant</p>
      <Link to="/signup"><button>Sign Up</button></Link>
      <Link to="/login"><button>Login</button></Link>
      <Link to="/chat"><button>Open Chatbot</button></Link>
    </div>
  );
}