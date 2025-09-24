// src/components/RequireAdminAuth.tsx
import { Navigate } from "react-router";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function RequireAdminAuth({ children }: Props) {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
