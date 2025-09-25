// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "@/layouts/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import OrderPage from "./pages/OrderPage";
import ScrollToTop from "./components/ScrollToTop";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AddProductsPage from "./pages/admin/AddProductsPage";
import AdminProductDetail from "./pages/admin/AdminProductDetail";
import AdminLogin from "./pages/admin/AdminLogin";
import RequireAdminAuth from "./components/RequireAdminAuth";
import ProductDetails from "./pages/ProductDetails";
import EditProductPage from "./pages/admin/AdminProductEdit";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<OrderPage />} />
          <Route path="products/:id" element={<ProductDetails />} />
        </Route>

        {/* Admin login (public) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin routes */}
        <Route
          path="/admin"
          element={
            <RequireAdminAuth>
              <AdminLayout />
            </RequireAdminAuth>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/add" element={<AddProductsPage />} />
          <Route path="products/edit/:id" element={<EditProductPage />} />
          <Route path="products/:id" element={<AdminProductDetail />} />
          <Route path="orders" element={<AdminOrders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;