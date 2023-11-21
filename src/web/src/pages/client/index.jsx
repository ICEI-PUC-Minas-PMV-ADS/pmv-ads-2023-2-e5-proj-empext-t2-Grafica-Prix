import ProtectedRoute from "../../services/auth";
import { Outlet } from "react-router";
import { Content } from "./styles";
import Header from "../../components/client/header";
import Footer from "../../components/client/footer";

export default function Client() {
  return (
    <ProtectedRoute client>
      <Header />
      <Content>
        <Outlet />
        <Footer />
      </Content>
    </ProtectedRoute>
  );
}
