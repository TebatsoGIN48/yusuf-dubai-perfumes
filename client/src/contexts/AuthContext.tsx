import React, { createContext, useState, useContext, useEffect } from 'react';

// List of allowed admin users
const ADMIN_USERS = [
  { username: 'admin', password: 'yusuf2025' },
  { username: 'manager', password: 'perfume2025' }
];

interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Check for stored auth on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('ydp_auth_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Error parsing stored user:', e);
        localStorage.removeItem('ydp_auth_user');
      }
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    // Find matching user in allowed list
    const foundUser = ADMIN_USERS.find(
      u => u.username === username && u.password === password
    );
    
    if (foundUser) {
      const userObj = { username: foundUser.username };
      setUser(userObj);
      // Store in localStorage for persistence
      localStorage.setItem('ydp_auth_user', JSON.stringify(userObj));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ydp_auth_user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
