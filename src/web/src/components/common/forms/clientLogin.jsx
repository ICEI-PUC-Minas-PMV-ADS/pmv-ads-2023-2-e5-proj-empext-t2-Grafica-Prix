import React, { useState } from "react";
import Form from "../../../components/common/formComponents";
import useAuth from "../../../context/auth";
import { TextForgotPassword } from "../../../pages/common/login/styles";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function ClientLogin() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

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
        if (res.user?.permissao) {
          client.setQueryData(
            { queryKey: ["employee", res.user.id] },
            res.user
          );
        } else {
          client.setQueryData({ queryKey: ["me", res.user.id] }, res.user);
        }
      },
      (e) => {
        setLoading(false);
        toast.error(
          "Email ou senha inválidos. Certifique-se que os dados informado estajam corretos."
        );
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
