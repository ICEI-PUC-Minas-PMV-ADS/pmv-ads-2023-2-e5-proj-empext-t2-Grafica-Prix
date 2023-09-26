import React, { useState } from "react";
import Form from "../formComponents";
import useAuth from "../../context/auth";
import { TextForgotPassword } from "../../pages/login/styles";
import { Link } from "react-router-dom";

export default function ClientLogin() {
  const { login } = useAuth();

  function handleSubmir(data) {
    login(data).then((res) => console.log(res));
  }

  return (
    <Form
      data={{
        email: "",
        senha: "",
      }}
      onSubmit={handleSubmir}
      gap="10px"
    >
      <Form.Input name="email" placeHolder="Email" />
      <Form.Input name="senha" placeHolder="Senha" />

      <Form.AlignContent justify="space-between">
        <Form.Button
          type="submit"
          title="Entrar"
          width="fit-content"
          padding="7px 30px"
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
