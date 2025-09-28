import { Navigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function RequireAdminAuth({ children }: Props) {
  const [isValidating, setIsValidating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      try {
        // No need to manually handle tokens - cookies are sent automatically
        const response = await axios.get('http://localhost:5000/api/admin/validate-token', {
          withCredentials: true, // Important: sends cookies with request
        });

        if (response.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Token validation failed:', error);
        setIsAuthenticated(false);
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, []);

  // Show loading while validating
  if (isValidating) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Verifying authentication...</span>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}