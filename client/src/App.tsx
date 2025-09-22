import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import Layout from "@/layouts/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import OrderPage from "./pages/OrderPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<OrderPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
