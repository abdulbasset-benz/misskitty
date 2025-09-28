// src/layouts/AdminLayout.tsx - Fixed for cookie-based auth
import { Outlet, Link, useNavigate } from "react-router";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function AdminLayout() {
  const navigate = useNavigate();
  const { logout, admin } = useAdminAuth();

  const handleLogout = async () => {
    try {
      await logout(); // This calls the API and clears the cookie
      navigate("/admin/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      // Force logout even if API call fails
      navigate("/admin/login", { replace: true });
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4 flex flex-col justify-between">
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold">Admin</h2>
            {admin && (
              <p className="text-sm text-gray-400 mt-1">
                Welcome, {admin.email}
              </p>
            )}
          </div>
          
          <nav className="flex flex-col gap-3">
            <Link 
              to="/admin" 
              className="hover:text-gray-300 transition-colors"
            >
              Dashboard
            </Link>
            <Link 
              to="/admin/products" 
              className="hover:text-gray-300 transition-colors"
            >
              Products
            </Link>
            {/* <Link to="/admin/orders" className="hover:text-gray-300 transition-colors">
              Orders
            </Link> */}
            
            {/* Divider */}
            <hr className="border-gray-700 my-2" />
            
            <Link 
              to="/" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors flex items-center gap-2"
            >
              View Website
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                />
              </svg>
            </Link>
          </nav>
        </div>
        
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 hover:bg-red-700 py-2 px-4 rounded transition-colors"
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