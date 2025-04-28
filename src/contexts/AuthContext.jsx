import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const session = localStorage.getItem('session');
    if (session) {
      const userData = JSON.parse(localStorage.getItem('users'))?.find(
        u => u.id === JSON.parse(session).userId
      );
      if (userData) {
        setUser(userData);
      }
    }
    setLoading(false);
  };

  const signup = async ({ name, email, password }) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.email === email)) {
      throw new Error('Email already exists');
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password, // In a real app, this should be hashed
      profilePic: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
      preferences: { theme }
    };

    localStorage.setItem('users', JSON.stringify([...users, newUser]));
    return true;
  };

  const login = async ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email);
    
    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }

    const session = { userId: user.id, timestamp: Date.now() };
    localStorage.setItem('session', JSON.stringify(session));
    setUser(user);
    return user;
  };

  const logout = () => {
    localStorage.removeItem('session');
    setUser(null);
    navigate('/login');
  };

  const updateProfile = (updates) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map(u => 
      u.id === user.id ? { ...u, ...updates } : u
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUser(prev => ({ ...prev, ...updates }));
  };

  const deleteAccount = async (password) => {
    if (user.password !== password) {
      throw new Error('Invalid password');
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    localStorage.setItem('users', 
      JSON.stringify(users.filter(u => u.id !== user.id))
    );
    logout();
  };

  const updateTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    updateProfile({ preferences: { ...user.preferences, theme: newTheme } });
  };

  const value = {
    user,
    loading,
    theme,
    signup,
    login,
    logout,
    updateProfile,
    deleteAccount,
    updateTheme
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
