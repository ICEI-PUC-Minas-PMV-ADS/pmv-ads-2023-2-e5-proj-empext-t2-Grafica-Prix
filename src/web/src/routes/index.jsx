import { Routes, Route } from "react-router-dom";
import Login from "../pages/login";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
    </Routes>
  );
}
