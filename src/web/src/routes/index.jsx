import { Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import RecoverPassoword from "../pages/recoverPassword";
import Profile from "../pages/profile";
import Home from "../pages/home";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="recover-password" element={<RecoverPassoword />} />
      <Route path="profile" element={<Profile />} />
    </Routes>
  );
}
