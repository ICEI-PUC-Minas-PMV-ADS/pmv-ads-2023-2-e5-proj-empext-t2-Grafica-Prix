import React, { useState } from "react";
import http from "../../../../services/http";
import { toast } from "react-toastify";
import Form from "../../../common/formComponents";
import { useQueryClient } from "@tanstack/react-query";

export default function Edit({ data, setModal }) {
  const [loading, setLoading] = useState(false);

  const client = useQueryClient();

  function handleSubmit(values) {
    setLoading(true);

    let dataObj = { ...values, id: data?.id };

    http.put(`api/Colaborador/${data?.id}`, dataObj).then(
      () => {
        setLoading(false);
        client.invalidateQueries({ queryKey: ["employees"] });
        toast.success("Colaborador editado com sucesso");
        setModal(false);
      },
      () => {
        setLoading(false);
        toast.error("Erro ao editar colaborador");
      }
    );
  }

  return (
    <Form
      data={{
        name: data?.name,
        email: data?.email,
        telefone: data?.telefone,
        senha: "",
        cpf: data?.cpf,
        endereco: data?.endereco,
      }}
      onSubmit={handleSubmit}
      gap="5px"
      margin="10px 0"
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
      <Form.Input
        name="senha"
        placeHolder="********"
        label="Senha"
        required
        type="password"
      />
      <Form.Input name="cpf" placeHolder="Ex: 560.650.390-55" label="CPF" />
      <Form.Input
        name="endereco"
        placeHolder="Ex: Rua A - 13, Belo Horizonte..."
        label="Endereço"
      />
      <Form.Button
        type="submit"
        title="Editar"
        minWidth="fit-content"
        padding="10px 30px"
        margin="5px 0 0 0"
        loading={loading}
      />
    </Form>
  );
}
