import React, { useState } from "react";
import Form from "../../../common/formComponents";
import http from "../../../../services/http";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getCategories } from "../../../../services/api/categories";

export default function Register() {
  const [loading, setLoading] = useState(false);

  const client = useQueryClient();

  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  function handleSubmit(values) {
    setLoading(true);

    const formData = new FormData();
    const salaryFormat = new Intl.NumberFormat("pt-BR");

    for (let key in values) {
      if (key === "Preco") {
        formData.append(key, salaryFormat.format(values[key]));
        continue;
      }
      formData.append(key, values[key]);
    }

    http.post("api/Produto", formData).then(
      () => {
        toast.success("Produto cadastrado com sucesso");
        setLoading(false);
        client.invalidateQueries({ queryKey: ["products"] });
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
        CategoriaId: "",
        Observacao: "",
      }}
      onSubmit={handleSubmit}
      gap="10px"
    >
      <Form.File name="Imagem" />
      <Form.Input label="Nome" name="Nome" />
      <Form.InputPrice label="Preço" name="Preco" />
      <Form.Number label="Quantidade" name="Quantidade" />
      <Form.Select
        label="Categoria"
        name="CategoriaId"
        options={categories.data?.map((category) => {
          return {
            label: category.nome,
            value: category.id,
          };
        })}
      />
      <Form.Editor label="Descrição" name="Descricao" />
      <Form.Editor label="Observação" name="Observacao" />
      <Form.InputPrice label="Promoção" name="Promocao" />
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
