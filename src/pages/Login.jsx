import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const {
    login,
    loginWithFaceId,
    loginWithVoice,
    loginWithSSO,
    loginWithFingerprint,
  } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/chat");
    } catch (err) {
      console.error(err);
      setError("Login failed");
    }
  };

  const handleFaceId = async () => {
    try {
      await loginWithFaceId();
      navigate("/chat");
    } catch (err) {
      console.error(err);
      setError("Face ID login failed");
    }
  };

  const handleVoice = async () => {
    try {
      await loginWithVoice();
      navigate("/chat");
    } catch (err) {
      console.error(err);
      setError("Voice login failed");
    }
  };

  const handleSSO = async () => {
    try {
      await loginWithSSO();
      navigate("/chat");
    } catch (err) {
      console.error(err);
      setError("SSO login failed");
    }
  };

  const handleFingerprint = async () => {
    try {
      await loginWithFingerprint();
      navigate("/chat");
    } catch (err) {
      console.error(err);
      setError("Fingerprint login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "center", marginTop: "5rem" }}>
      <h2>Login</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      <div style={{ marginTop: "1rem" }}>
        <button type="button" onClick={handleFaceId}>Face ID</button>
        <button type="button" onClick={handleVoice}>Voice</button>
        <button type="button" onClick={handleSSO}>Single Sign On</button>
        <button type="button" onClick={handleFingerprint}>Thumb</button>
      </div>
      {error && <p>{error}</p>}
    </form>
  );
}
