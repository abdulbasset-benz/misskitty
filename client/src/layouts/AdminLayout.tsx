// src/layouts/AdminLayout.jsx
import { Outlet, Link } from "react-router";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-2xl font-bold mb-6">Admin</h2>
        <nav className="flex flex-col gap-3">
          <Link to="/admin" className="hover:text-gray-300">Dashboard</Link>
          <Link to="/admin/products" className="hover:text-gray-300">Products</Link>
          <Link to="/admin/orders" className="hover:text-gray-300">Orders</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
