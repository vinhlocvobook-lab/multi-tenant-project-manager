import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthResponse } from '@multi-tenant/shared-types';
import apiClient, { setAccessToken } from '../api/api-client';

interface AuthContextType {
  token: string | null;
  user: AuthResponse['user'] | null;
  login: (data: AuthResponse) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthResponse['user'] | null>(
    JSON.parse(localStorage.getItem('user') || 'null')
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          const response = await apiClient.post('/auth/refresh');
          const { accessToken, user: updatedUser } = response.data;
          setToken(accessToken);
          setAccessToken(accessToken);
          // Update user from the refresh response (has latest role/permissions)
          if (updatedUser) {
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
          }
        } catch (error) {
          localStorage.removeItem('user');
          setToken(null);
          setAccessToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = (data: AuthResponse) => {
    localStorage.setItem('user', JSON.stringify(data.user));
    setToken(data.accessToken);
    setAccessToken(data.accessToken);
    setUser(data.user);
  };

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout error', error);
    } finally {
      localStorage.removeItem('user');
      setToken(null);
      setAccessToken(null);
      setUser(null);
    }
  };

  const hasPermission = (permission: string): boolean => {
    if (!user || !user.role || !user.role.permissions) return false;
    // user.role.permissions is a string[] in the AuthResponse from backend
    return (user.role.permissions as string[]).includes(permission);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isAuthenticated: !!token && !!user,
        isLoading,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
