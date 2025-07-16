import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Link } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Vastu from "./pages/Vastu";
import Room3D from "./pages/Room3D";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./styles.css";
function HomePage() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const [title, setTitle] = useState("Welcome to 7 Star Interior App");
  const [tagline, setTagline] = useState("Design with Voice. Visualize with AI. Approve with Ease.");
  const [loginLabel, setLoginLabel] = useState("Login");
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    process.env.PUBLIC_URL + "/bedroom.png",
    process.env.PUBLIC_URL + "/bathroom.png",
    process.env.PUBLIC_URL + "/kitchen.png",
    process.env.PUBLIC_URL + "/dining.png",
    process.env.PUBLIC_URL + "/livingroom.png",
    process.env.PUBLIC_URL + "/movieroom.png",
    process.env.PUBLIC_URL + "/playroom.png"
  ];
  const loginLabels = {
    en: "Login",
    fr: "Connexion",
    es: "Iniciar sesión",
    hi: "लॉग इन करें",
    te: "లాగిన్"
  };
  useEffect(() => {
    setLoginLabel(loginLabels[language] || "Login");
    fetch(`/api/translate?text=${encodeURIComponent("Welcome to 7 Star Interior App")}&lang=${language}`)
      .then(res => res.json())
      .then(data => setTitle(data.translation))
      .catch(() => setTitle("Welcome to 7 Star Interior App"));
    fetch(`/api/translate?text=${encodeURIComponent("Design with Voice. Visualize with AI. Approve with Ease.")}&lang=${language}`)
      .then(res => res.json())
      .then(data => setTagline(data.translation))
      .catch(() => setTagline("Design with Voice. Visualize with AI. Approve with Ease."));
  }, [language]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(prev => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="hero">
      <div className="menu-container">
        <button className="menu-button">☰ Menu</button>
        <div className="menu-dropdown">
          <Link to="/vastu">Vastu</Link>
          <Link to="/3droom">3D Room</Link>
        </div>
      </div>
      <img
        src={images[currentImage]}
        alt="Interior Example"
        className="logo"
      />
      <div className="language-select">
        <label htmlFor="langSelect">Language:</label>
        <select
          id="langSelect"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="es">Español</option>
          <option value="hi">हिन्दీ</option>
          <option value="te">తెలుగు</option>
        </select>
      </div>
      <div className="title">{title}</div>
      <div className="tagline">{tagline}</div>
      <button id="loginBtn" onClick={() => navigate("/login")}>
        {loginLabel}
      </button>
      <>
  <footer>
    <nav className="footer-links">
      <Link to="/about">About Us</Link>
      <Link to="/terms">Terms & Conditions</Link>
      <Link to="/contact">Contact Us</Link>
    </nav>
    <p>© 2025 7 Star Interior App. All rights reserved.</p>
  </footer>
  <a
    href="https://chat.openai.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="chatgpt-fab"
    title="ChatGPT 4o-mini"
  >
    <button style={{
      background: '#10A37F',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1rem',
      borderRadius: '50%',
      fontSize: '1.2rem',
      cursor: 'pointer'
    }}>
      :speech_balloon:
    </button>
  </a>
</>







    </div>
  );
}
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/vastu" element={<Vastu />} />
        <Route path="/3droom" element={<Room3D />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}