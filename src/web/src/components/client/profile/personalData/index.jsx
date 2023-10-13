import React, { useState } from "react";
import Form from "../../../../components/common/formComponents";
import * as Yup from "yup";
import { ErrorMessage } from "../../../../components/common/formComponents/styles";
import http from "../../../../services/http";
import Text from "../../../common/text";
import useAuth from "../../../../context/auth";

export default function FormPersonalData({ data }) {
  const { logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState({
    title: "",
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Este campo é obrigatório"),
    email: Yup.string().required("Este campo é obrigatório"),
    telefone: Yup.string().required("Este campo é obrigatório"),
    cpf: Yup.string().nullable(),
    endereco: Yup.string().nullable(),
  });

  function handleSubmit(data) {
    setLoading(true);
    http.post("", data).then(
      (res) => {
        setLoading(false);
        setForm("login");
      },
      (e) => {
        setLoading(false);
        setMessageError({
          title: "Erro ao efetuar o cadastro",
        });
      }
    );
  }

  return (
    data && (
      <Form
        data={{
          name: data?.name,
          email: data?.email,
          telefone: data?.telefone,
          cpf: data?.cpf,
          endereco: data?.endereco,
        }}
        onSubmit={handleSubmit}
        gap="5px"
        validationSchema={validationSchema}
      >
        <Form.Input
          name="name"
          placeHolder="Ex: João Batista"
          label="Nome completo"
          required
        />
        <Form.Input
          name="email"
          placeHolder="Ex: joaob3@gmail.com"
          label="Email"
          required
        />
        <Form.Input
          name="telefone"
          placeHolder="Ex: (24) 99786-1974"
          label="Telefone"
          required
        />
        <Form.Input name="cpf" placeHolder="Ex: 560.650.390-55" label="CPF" />
        <Form.Input
          name="endereco"
          placeHolder="Ex: Rua A - 13, Belo Horizonte..."
          label="Endereço"
        />
        <Form.Button
          type="submit"
          title="Confirmar"
          minWidth="fit-content"
          padding="10px 30px"
          margin="5px 0 0 0"
          loading={loading}
        />
        {messageError.title && (
          <ErrorMessage>{messageError.title}</ErrorMessage>
        )}
        <Text
          size="20px"
          weight="600"
          color="#ff5757"
          textAlign="center"
          cursor="pointer"
          margin="10px 0"
          onClick={logout}
        >
          Sair
        </Text>
      </Form>
    )
  );
}
