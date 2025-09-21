import { Route, Routes } from "react-router";
import "./App.css";
import Layout from "@/layouts/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
      </Route>
    </Routes>
  );
}

export default App;
