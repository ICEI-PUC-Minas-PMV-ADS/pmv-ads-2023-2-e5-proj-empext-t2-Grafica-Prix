import React, { useState } from "react";
import Container from "../../components/container";
import Form from "../../components/formComponents";
import http from "../../services/http";
import {
  Background,
  Card,
  DescriptionRecoverPassword,
  Logo,
  TitleRecoverPassword,
} from "./styles";
import logo from "../../assets/logo-prix-removebg-preview 1.png";

export default function RecoverPassoword({ newPassword }) {
  const [loading, setLoading] = useState(false);

  function handleRecoverPassword(value) {
    setLoading(true);

    http.post("/api/redefinir-senha/solicitar/", { email: value.email }).then(
      (res) => {
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );
  }

  return (
    <Background>
      <Container maxWidth="380px">
        <Card>
          <Logo src={logo} />
          <TitleRecoverPassword>Recuperar senha</TitleRecoverPassword>
          <Form data={{ email: "" }} onSubmit={handleRecoverPassword} gap="5px">
            <Form.Input
              name="email"
              placeHolder="Insira um e-mail para recuperação de senha"
            />
            <Form.Button
              type="submit"
              title="Enviar"
              minWidth="fit-content"
              padding="10px 30px"
              margin="5px 0 0 0"
              loading={loading}
            />
          </Form>
        </Card>
      </Container>
    </Background>
  );
}
