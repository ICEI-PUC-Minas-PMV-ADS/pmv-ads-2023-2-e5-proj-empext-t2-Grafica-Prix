import React, { useState } from "react";
import Form from "../formComponents";
import useAuth from "../../context/auth";
import { TextForgotPassword } from "../../pages/login/styles";
import { Link } from "react-router-dom";
import * as Yup from "yup";

export default function ClientLogin() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Este campo é obrigatório"),
    senha: Yup.string().required("Este campo é obrigatório"),
  });

  function handleSubmir(data) {
    setLoading(true);
    login(data).then(
      (res) => {
        setLoading(false);
      },
      (e) => {
        setLoading(false);
      }
    );
  }

  return (
    <Form
      data={{
        email: "",
        senha: "",
      }}
      onSubmit={handleSubmir}
      gap="5px"
      validationSchema={validationSchema}
    >
      <Form.Input
        name="email"
        placeHolder="Ex: joaob3@gmail.com"
        label="Email"
      />
      <Form.Input
        name="senha"
        placeHolder="********"
        label="Senha"
        type="password"
      />

      <Form.AlignContent justify="space-between" break="1170px">
        <Form.Button
          type="submit"
          title="Entrar"
          minWidth="fit-content"
          padding="7px 30px"
          loading={loading}
        />
        <TextForgotPassword>
          Esqueceu sua senha?{" "}
          <Link style={{ color: "#ff5757", textDecoration: "none" }}>
            Recuperar senha
          </Link>
        </TextForgotPassword>
      </Form.AlignContent>
    </Form>
  );
}
