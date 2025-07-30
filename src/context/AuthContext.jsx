import React, { useContext, useState, createContext } from "react";
import { loginUser, registerUser, logoutUser } from "../services/authService";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (username, password) => {
    const data = await loginUser(username, password);
    setCurrentUser({ name: data.username || username });
  };

  // Placeholder biometric and SSO logins
  const loginWithFaceId = async () => {
    setCurrentUser({ name: "FaceID User" });
  };

  const loginWithVoice = async () => {
    setCurrentUser({ name: "Voice User" });
  };

  const loginWithSSO = async () => {
    setCurrentUser({ name: "SSO User" });
  };

  const loginWithFingerprint = async () => {
    setCurrentUser({ name: "Fingerprint User" });
  };

  const signup = async (credentials) => {
    const data = await registerUser(credentials);
    setCurrentUser({ name: data.username || credentials.username });
  };

  // Placeholder biometric and SSO signups
  const signupWithFaceId = async () => {
    setCurrentUser({ name: "FaceID User" });
  };

  const signupWithVoice = async () => {
    setCurrentUser({ name: "Voice User" });
  };

  const signupWithSSO = async () => {
    setCurrentUser({ name: "SSO User" });
  };

  const signupWithFingerprint = async () => {
    setCurrentUser({ name: "Fingerprint User" });
  };

  const logout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loginWithFaceId,
    loginWithVoice,
    loginWithSSO,
    loginWithFingerprint,
    signupWithFaceId,
    signupWithVoice,
    signupWithSSO,
    signupWithFingerprint,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}