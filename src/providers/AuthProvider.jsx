import { createContext, useContext, useEffect, useState } from "react";

import { jwtDecode } from "jwt-decode";
import { isTokenExpired } from "../utils/auth-utils";

export const AuthContext = createContext(null);

export const useAuthContext = () => {
  if (!AuthContext) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  const register = async (registerData) => {
    try {
      const myHeaders = new Headers();

      myHeaders.append("accept", "text/plain");
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify(registerData);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const res = await fetch("/api/Auth/register", requestOptions);

      const data = await res.json();

      localStorage.setItem("token", data.token);

      setToken(data.token);

      return data.token;
    } catch (error) {
      console.error("Registration failed:", error);
      throw new Error("Registration failed. Please try again.");
    }
  };

  const login = async (email, password) => {
    try {
      const myHeaders = new Headers();

      myHeaders.append("accept", "text/plain");
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        email,
        password,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const res = await fetch("/api/Auth/login", requestOptions);

      const data = await res.json();

      localStorage.setItem("token", data.token);

      setToken(data.token);

      return data.token;
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Login failed. Please try again.");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);
  };

  const parseUserFromToken = (token) => {
    const decoded = jwtDecode(token);

    // eslint-disable-next-line no-unused-vars
    const { aud, exp, iss, createdAt, updatedAt, ...others } = decoded;

    return {
      ...others,
      createdAt: new Date(createdAt),
      updatedAt: new Date(updatedAt),
    };
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token");
      setUser(null);
      return;
    }

    setUser(parseUserFromToken(token));
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
