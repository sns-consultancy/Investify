import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const [loginLabel, setLoginLabel] = useState("Login");
  const [loginTitle, setLoginTitle] = useState("User Login");
  const [registerLinkText, setRegisterLinkText] = useState("New user? Register here");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginLabels = {
    en: "Login",
    fr: "Connexion",
    es: "Iniciar sesión",
    hi: "लॉग इन करें",
    te: "లాగిన్"
  };
  const loginTitles = {
    en: "User Login",
    fr: "Connexion Utilisateur",
    es: "Inicio de sesión de usuario",
    hi: "यूज़र लॉगिन",
    te: "వినియోగదారు లాగిన్"
  };
  const registerLinks = {
    en: "New user? Register here",
    fr: "Nouvel utilisateur ? Inscrivez-vous ici",
    es: "¿Nuevo usuario? Regístrate aquí",
    hi: "नया उपयोगकर्ता? यहाँ पंजीकरण करें",
    te: "కొత్త వినియోగదారు? ఇక్కడ నమోదు చేయండి"
  };
  useEffect(() => {
    setLoginLabel(loginLabels[language] || "Login");
    setLoginTitle(loginTitles[language] || "User Login");
    setRegisterLinkText(registerLinks[language] || "New user? Register here");
  }, [language]);
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logged in as ${username}`);
    navigate("/3droom");
  };
  return (
    <div className="hero">
      <h1>{loginTitle}</h1>
      <div className="language-select">
        <label htmlFor="langSelect">Language:</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="es">Español</option>
          <option value="hi">हिन्दी</option>
          <option value="te">తెలుగు</option>
        </select>
      </div>
      <form onSubmit={handleSubmit} style={{ maxWidth: "300px", width: "100%" }}>
        <input
          type="text"
          placeholder="Username or Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
        />
        <button type="submit" className="primary-button">{loginLabel}</button>
      </form>
      <br />
      <button
        className="secondary-button"
        onClick={() => navigate("/signup")}
      >
        {registerLinkText}
      </button>
    </div>
  );
}
















