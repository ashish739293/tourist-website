// context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Replace with actual user authentication logic
  const navigate = useNavigate();

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

//   const isAdmin = user?.role === 'admin'; // Assume user has a "role" field
  const isAdmin = true; // Assume user has a "role" field


  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
