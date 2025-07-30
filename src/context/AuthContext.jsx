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

  const signup = async (credentials) => {
    const data = await registerUser(credentials);
    setCurrentUser({ name: data.username || credentials.username });
  };

  const logout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  const value = { currentUser, login, signup, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}