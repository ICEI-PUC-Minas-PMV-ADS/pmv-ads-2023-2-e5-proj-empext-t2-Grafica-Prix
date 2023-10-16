import React, { useState } from "react";
import Form from "../../../common/formComponents";
import http from "../../../../services/http";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function Edit({ data, setModal }) {
  const [loading, setLoading] = useState(false);

  const client = useQueryClient();

  function handleSubmit(values) {
    setLoading(true);

    let dataObj = { ...values, id: data?.id };

    http.put(`api/Categoria/${data?.id}`, dataObj).then(
      () => {
        setLoading(false);
        client.invalidateQueries({ queryKey: ["categories"] });
        toast.success("Categoria editada com sucesso");
        setModal(false);
      },
      () => {
        setLoading(false);
        toast.error("Erro ao editar categoria");
      }
    );
  }

  return (
    <Form
      data={{ nome: data?.nome, descricao: data?.descricao }}
      onSubmit={handleSubmit}
      gap="10px"
      margin="10px 0"
    >
      <Form.Input label="Nome" name="nome" />
      <Form.Editor label="Descrição" name="descricao" />
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
