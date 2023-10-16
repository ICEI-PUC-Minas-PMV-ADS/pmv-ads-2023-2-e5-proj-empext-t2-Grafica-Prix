import { Routes, Route } from "react-router-dom";
import Login from "../pages/common/login";
import RecoverPassoword from "../pages/common/recoverPassword";
import Home from "../pages/client/home";
import Admin from "../pages/admin";
import Dashboard from "../pages/admin/dashboard";
import Categories from "../pages/admin/categories";
import Client from "../pages/client";
import Products from "../pages/admin/products";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Client />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="admin" element={<Admin />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="categories" element={<Categories />} />
        <Route path="products" element={<Products />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="recover-password" element={<RecoverPassoword />} />
    </Routes>
  );
}
