import { Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import RecoverPassoword from "../pages/recoverPassword";
import Profile from "../pages/profile";
import Home from "../pages/home";
import Admin from "../pages/admin";
import Dashboard from "../pages/admin/dashboard";
import Categories from "../pages/admin/categories";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="admin" element={<Admin />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="categories" element={<Categories />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="recover-password" element={<RecoverPassoword />} />
      <Route path="profile" element={<Profile />} />
    </Routes>
  );
}