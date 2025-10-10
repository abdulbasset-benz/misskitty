import { useState, useEffect } from 'react';
import api from '@/api/axios'; // ✅ use your centralized API config

interface AdminUser {
  id: number;
  email: string;
}

interface UseAdminAuth {
  isAuthenticated: boolean;
  admin: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

export const useAdminAuth = (): UseAdminAuth => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await api.get('/admin/me');

      if (response.status === 200) {
        const data = response.data;
        setAdmin(data.admin);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setAdmin(null);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/admin/login', { email, password });
      const data = response.data;

      if (data.success) {
        setAdmin(data.admin);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      return { success: false, message };
    }
  };

  const logout = async () => {
    try {
      await api.post('/admin/logout');
    } catch (error) {
      console.error('Logout request failed:', error);
    }

    setIsAuthenticated(false);
    setAdmin(null);
  };

  return {
    isAuthenticated,
    admin,
    loading,
    login,
    logout,
  };
};
