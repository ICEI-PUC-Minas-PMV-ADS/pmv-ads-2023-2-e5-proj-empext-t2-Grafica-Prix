import { Routes, Route } from "react-router-dom";
import Login from "../pages/common/login";
import RecoverPassoword from "../pages/common/recoverPassword";
import Home from "../pages/client/home";
import Admin from "../pages/admin";
import Dashboard from "../pages/admin/dashboard";
import Categories from "../pages/admin/categories";
import Client from "../pages/client";
import Products from "../pages/admin/products";
import Detail from "../pages/client/product/details";
import BudgetList from "../components/client/budgetList";
import SearchResult from "../pages/client/searchResult";
import Budgets from "../pages/admin/budgets";
import Employees from "../pages/admin/employees";
import Banners from "../pages/admin/banners";
import AboutUsClient from "../pages/client/aboutUs";
import AboutUsAdmin from "../pages/admin/aboutUs";
import Category from "../pages/client/category";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Client />}>
        <Route path="/" element={<Home />} />
        <Route path="product" element={<Detail />} />
        <Route path="budgets" element={<BudgetList />} />
        <Route path="search" element={<SearchResult />} />
        <Route path="about-us" element={<AboutUsClient />} />
        <Route path="category" element={<Category />} />
      </Route>
      <Route path="admin" element={<Admin />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="categories" element={<Categories />} />
        <Route path="products" element={<Products />} />
        <Route path="budgets" element={<Budgets />} />
        <Route path="employees" element={<Employees />} />
        <Route path="banners" element={<Banners />} />
        <Route path="about-us" element={<AboutUsAdmin />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="recover-password" element={<RecoverPassoword />} />
    </Routes>
  );
}
