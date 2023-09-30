import React, { useState } from "react";
import Form from "../formComponents";
import useAuth from "../../context/auth";
import { TextForgotPassword } from "../../pages/login/styles";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useQueryClient } from "@tanstack/react-query";

export default function ClientLogin() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const client = useQueryClient();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Este campo é obrigatório"),
    senha: Yup.string().required("Este campo é obrigatório"),
  });

  function handleSubmir(data) {
    setLoading(true);
    login(data).then(
      (res) => {
        setLoading(false);
        console.log(res);
        client.setQueryData(
          { queryKey: ["me", res.dbusuario.id] },
          res.dbusuario
        );
      },
      (e) => {
        setLoading(false);
      }
    );
  }

  return (
    <>
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
        <Form.Button
          type="submit"
          title="Entrar"
          minWidth="fit-content"
          padding="10px 30px"
          margin="5px 0 0 0"
          loading={loading}
        />
        <TextForgotPassword>
          Esqueceu sua senha?{" "}
          <Link
            to="/recover-password/"
            style={{ color: "#ff5757", textDecoration: "none" }}
          >
            Recuperar senha
          </Link>
        </TextForgotPassword>
      </Form>
    </>
  );
}
