import React, { useState } from "react";
import Form from "../../../common/formComponents";
import http from "../../../../services/http";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function Register() {
  const [loading, setLoading] = useState(false);

  const client = useQueryClient();

  function handleSubmit(values) {
    setLoading(true);

    http.post("api/Categoria", values).then(
      () => {
        setLoading(false);
        client.invalidateQueries({ queryKey: ["categories"] });
        toast.success("Categoria cadastrada com sucesso");
      },
      () => {
        setLoading(false);
        toast.error("Categoria cadastrada com sucesso");
      }
    );
  }

  return (
    <Form data={{}} onSubmit={handleSubmit} gap="10px">
      <Form.Input label="Nome" name="nome" />
      <Form.Editor label="Descrição" name="descricao" />
      <Form.Button
        type="submit"
        title="Cadastrar"
        minWidth="fit-content"
        padding="10px 30px"
        margin="5px 0 0 0"
        loading={loading}
      />
    </Form>
  );
}
