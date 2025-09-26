// src/layouts/AdminLayout.tsx
import { Outlet, Link, useNavigate } from "react-router";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-6">Admin</h2>
          <nav className="flex flex-col gap-3">
            
            <Link to="/admin/products" className="hover:text-gray-300">
              Products
            </Link>
            {/* <Link to="/admin/orders" className="hover:text-gray-300">
              Orders
            </Link> */}
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 hover:bg-red-700 py-2 px-4 rounded"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
