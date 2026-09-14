import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';
import { api } from '../lib/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  signup: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('orbit_token'));
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('orbit_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Validate session against backend on mount
  useEffect(() => {
    let isMounted = true;

    const verifySession = async () => {
      const storedToken = localStorage.getItem('orbit_token');
      if (!storedToken) {
        if (isMounted) {
          setUser(null);
          setToken(null);
          setIsLoading(false);
        }
        return;
      }

      try {
        const { user: verifiedUser } = await api.getMe();
        if (isMounted) {
          setUser(verifiedUser);
          setToken(storedToken);
          localStorage.setItem('orbit_user', JSON.stringify(verifiedUser));
        }
      } catch (err) {
        // Token is invalid, expired, or rejected by backend
        if (isMounted) {
          localStorage.removeItem('orbit_token');
          localStorage.removeItem('orbit_user');
          setUser(null);
          setToken(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    verifySession();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = (newToken: string, userData: User) => {
    localStorage.setItem('orbit_token', newToken);
    localStorage.setItem('orbit_user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  };

  const signup = (newToken: string, userData: User) => {
    localStorage.setItem('orbit_token', newToken);
    localStorage.setItem('orbit_user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    api.logout().catch(() => {});
    localStorage.removeItem('orbit_token');
    localStorage.removeItem('orbit_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
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

