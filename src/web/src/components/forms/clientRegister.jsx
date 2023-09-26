import React, { useState } from "react";
import Form from "../../components/formComponents";
import useAuth from "../../context/auth";

export default function ClientRegister(props) {
  const { register } = useAuth();

  function handleSubmir(data) {
    register(data).then((res) => console.log(res));
  }

  return (
    <Form
      data={{
        name: "",
        email: "",
        telefone: "",
        senha: "",
        cpf: "",
        endereco: "",
      }}
      onSubmit={handleSubmir}
      gap="10px"
    >
      <Form.Input name="name" placeHolder="Nome completo" />
      <Form.Input name="email" placeHolder="Email" />
      <Form.Input name="telefone" placeHolder="Telefone" />
      <Form.Input name="senha" placeHolder="Senha" />
      <Form.Input name="cpf" placeHolder="CPF" />
      <Form.Input name="endereco" placeHolder="Endereço" />
      <Form.Button
        type="submit"
        title="Cadastrar"
        width="fit-content"
        padding="7px 30px"
      />
    </Form>
  );
}
