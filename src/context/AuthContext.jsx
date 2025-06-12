import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const LOCAL_STORAGE_AUTHENTICATE_KEY = "dev_user";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(() =>
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTHENTICATE_KEY))
  );

  const login = (user) => {
    setCurrentUser(user);
    localStorage.setItem(LOCAL_STORAGE_AUTHENTICATE_KEY, JSON.stringify(user));
  };

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_AUTHENTICATE_KEY);
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
