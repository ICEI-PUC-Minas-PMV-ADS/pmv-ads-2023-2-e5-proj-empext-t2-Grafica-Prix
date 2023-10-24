import React, { useEffect, useState } from "react";
import Form from "../../../common/formComponents";
import http from "../../../../services/http";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { currencyFormatter } from "../../../../services/priceServices";

export default function Edit({ data, setModal }) {
  const [loading, setLoading] = useState(false);
  const [fileConverted, setFileConverted] = useState();

  useEffect(() => {
    fetch(`data:image/png;base64,${data.imagem}`)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "File name", { type: "image/png" });
        setFileConverted(file);
      });
  }, [data.imagem]);

  const client = useQueryClient();

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

    http.put(`api/Produto/${data.id}`, formData).then(
      () => {
        setModal(false);
        setLoading(false);
        client.invalidateQueries({ queryKey: ["products"] });
        toast.success("Produto editado com sucesso");
      },
      () => {
        setLoading(false);
        toast.error("Erro ao editar produto");
      }
    );
  }

  return (
    fileConverted && (
      <Form
        data={{
          Nome: data.nome,
          Descricao: data.descricao,
          Preco: data.preco,
          Imagem: fileConverted,
          Promocao: data.promocao,
          Quantidade: data.quantidade,
        }}
        onSubmit={handleSubmit}
        gap="10px"
      >
        <Form.File name="Imagem" imageDefault={data.imagem} />
        <Form.Input label="Nome" name="Nome" />
        <Form.InputPrice label="Preço" name="Preco" />
        <Form.Number label="Quantidade" name="Quantidade" />
        <Form.Select label="Categoria" name="Categoria" />
        <Form.Editor label="Descrição" name="Descricao" />
        <Form.InputPrice label="Promoção" name="Promocao" />
        {fileConverted && (
          <Form.Button
            type="submit"
            title="Editar"
            minWidth="fit-content"
            padding="10px 30px"
            margin="5px 0 0 0"
            loading={loading}
          />
        )}
      </Form>
    )
  );
}
