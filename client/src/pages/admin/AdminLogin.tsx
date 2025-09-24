// src/pages/admin/AdminLogin.tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import api from "@/api/axios";
import type { AdminLoginRequest, AdminLoginResponse } from "../../types/admin";

export default function AdminLogin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post<AdminLoginResponse, { data: AdminLoginResponse }, AdminLoginRequest>(
        "/admin/login",
        { email, password }
      );

      localStorage.setItem("adminToken", res.data.token);
      navigate("/admin"); // redirect after login
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-96 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Admin Login</h1>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
