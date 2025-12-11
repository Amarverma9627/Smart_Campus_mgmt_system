// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("scms_user");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      if (parsed.token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${parsed.token}`;
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/api/auth/login", { email, password });
    // response: { userId, name, role, token }
    const loggedInUser = res.data;

    setUser(loggedInUser);
    localStorage.setItem("scms_user", JSON.stringify(loggedInUser));

    if (loggedInUser.token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${loggedInUser.token}`;
    }

    return loggedInUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("scms_user");
    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
