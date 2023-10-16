import React, { useState } from "react";
import Form from "../../../common/formComponents";
import http from "../../../../services/http";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { priceFormatter } from "../../../../services/priceServices";

export default function Register() {
  const [loading, setLoading] = useState(false);

  const client = useQueryClient();

  function handleSubmit(values) {
    setLoading(true);

    const formData = new FormData();

    for (let key in values) {
      if (key === "Preco") {
        formData.append(key, priceFormatter(values[key]));
        continue;
      }
      formData.append(key, values[key]);
    }

    http.post("api/Produto", formData).then(
      () => {
        setLoading(false);
        client.invalidateQueries({ queryKey: ["products"] });
        toast.success("Produto cadastrado com sucesso");
      },
      () => {
        setLoading(false);
        toast.error("Erro ao cadastrar produto");
      }
    );
  }

  return (
    <Form
      data={{
        Nome: "",
        Descricao: "",
        Preco: "",
        Imagem: "",
        Promocao: "",
        Quantidade: "",
      }}
      onSubmit={handleSubmit}
      gap="10px"
    >
      <Form.File name="Imagem" />
      <Form.Input label="Nome" name="Nome" />
      <Form.InputPrice label="Preço" name="Preco" />
      <Form.Number label="Quantidade" name="Quantidade" />
      {/*  <Form.Select label="Categoria" name="Categoria" /> */}
      <Form.Editor label="Descrição" name="Descricao" />
      <Form.Editor label="Promocao" name="Promocao" />
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