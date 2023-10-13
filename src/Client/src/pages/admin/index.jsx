import ProtectedRoute from "../../services/auth";
import { Outlet } from "react-router";
import { Content } from "./styles";
import Sidebar from "../../components/admin/sidebar";
import Container from "../../components/common/container";

export default function Admin() {
  return (
    <ProtectedRoute>
      <Container maxWidth="100%" padding="0" direction="row" gap="0">
        <Sidebar />
        <Content>
          <Outlet />
        </Content>
      </Container>
    </ProtectedRoute>
  );
}
