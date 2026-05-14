"use client";
import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { signUp, signIn, getUserMe } from '../services/authServices';
import useToastStore from '../store/toastStore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get('token');
      if (token) {
        try {
          const userData = await getUserMe(token);
          setUser({ ...userData, isAuthenticated: true });
        } catch (error) {
          console.error('Failed to fetch user:', error);
          Cookies.remove('token');
          setUser(null);
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  const login = async (identifier, password) => {
    try {
      const { jwt, user: userData } = await signIn(identifier, password);
      Cookies.set('token', jwt, { expires: 7 }); // Set cookie for 7 days
      setUser({ ...userData, isAuthenticated: true });
      router.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      const errorMessage = error.response?.data?.error?.message || 'Login failed. Please check your credentials.';
      useToastStore.getState().addToast(errorMessage, 'error');
    }
  };

  const register = async (username, email, password) => {
    try {
      const { jwt, user: userData } = await signUp(username, email, password);
      Cookies.set('token', jwt, { expires: 7 });
      setUser({ ...userData, isAuthenticated: true });
      router.push('/dashboard');
    } catch (error) {
      console.error('Registration failed:', error);
      const errorMessage = error.response?.data?.error?.message || 'Registration failed. Please try again.';
      useToastStore.getState().addToast(errorMessage, 'error');
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    router.push('/signin');
    useToastStore.getState().addToast('Session terminated.', 'success');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
