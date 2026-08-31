import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  signup: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: User = {
  _id: 'usr_66c28f9901aa92110293',
  name: 'Mohit',
  email: 'mohit@orbit.dev',
  createdAt: '2026-01-10T10:00:00.000Z',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('orbit_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEMO_USER;
      }
    }
    return DEMO_USER; // Default to demo user for exploration
  });

  const login = (token: string, userData: User) => {
    localStorage.setItem('orbit_token', token);
    localStorage.setItem('orbit_user', JSON.stringify(userData));
    setUser(userData);
  };

  const signup = (token: string, userData: User) => {
    localStorage.setItem('orbit_token', token);
    localStorage.setItem('orbit_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('orbit_token');
    localStorage.removeItem('orbit_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
