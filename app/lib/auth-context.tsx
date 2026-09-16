'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { demoUsers, type Role } from './mock-data';

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  staffId?: string;
  patientId?: string;
}

export type LoginResult = 'success' | 'invalid-credentials';

interface AuthContextType {
  user: User | null;
  login: (userId: string) => void;
  loginWithCredentials: (email: string, password: string) => LoginResult;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const clinicRoles: Role[] = ['ADMIN', 'RECEPTIONIST', 'DENTIST', 'INVENTORY_MANAGER'];

export function getRoleHome(role: Role) {
  return role === 'PATIENT' ? '/portal/dashboard' : '/clinic/dashboard';
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  loginWithCredentials: () => 'invalid-credentials',
  logout: () => {},
  isAuthenticated: false,
  isLoading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('dcms_user');
      if (stored) {
        const parsed = JSON.parse(stored) as User;
        const validUser = demoUsers.find(candidate => candidate.id === parsed.id);
        if (validUser && validUser.role === parsed.role) {
          // The stored session is restored after the browser-only auth check.
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setUser(validUser);
        } else {
          localStorage.removeItem('dcms_user');
        }
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (userId: string) => {
    const found = demoUsers.find((u) => u.id === userId);
    if (found) {
      setUser(found);
      localStorage.setItem('dcms_user', JSON.stringify(found));
    }
  };

  const loginWithCredentials = (email: string, password: string): LoginResult => {
    const found = demoUsers.find(candidate =>
      candidate.email.toLowerCase() === email.trim().toLowerCase() && candidate.password === password
    );
    if (!found) return 'invalid-credentials';
    setUser(found);
    localStorage.setItem('dcms_user', JSON.stringify(found));
    return 'success';
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dcms_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithCredentials, logout, isAuthenticated: !!user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
