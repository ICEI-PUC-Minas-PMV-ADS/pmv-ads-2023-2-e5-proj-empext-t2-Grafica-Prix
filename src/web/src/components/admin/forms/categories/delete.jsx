import React, { useState } from "react";
import Form from "../../../common/formComponents";
import http from "../../../../services/http";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Text from "../../../common/text";

export default function Delete({ data, setModal }) {
  const [loading, setLoading] = useState(false);

  const client = useQueryClient();

  function handleSubmit() {
    setLoading(true);

    http.delete(`api/Categoria/${data?.id}`, data?.id).then(
      () => {
        setLoading(false);
        client.invalidateQueries({ queryKey: ["categories"] });
        toast.success("Categoria deletada com sucesso");
        setModal(false);
      },
      () => {
        setLoading(false);
        toast.error("Erro ao deletar categoria");
      }
    );
  }

  return (
    <Form
      data={{ id: data?.id }}
      onSubmit={handleSubmit}
      gap="10px"
      margin="10px 0"
    >
      <Text size="20px" weight="600">
        {data?.nome}
      </Text>
      <Text
        size="12px"
        weight="500"
        dangerouslySetInnerHTML={{
          __html: data?.descricao,
        }}
      ></Text>
      <Form.Button
        type="submit"
        title="Deletar"
        minWidth="fit-content"
        padding="10px 30px"
        margin="5px 0 0 0"
        loading={loading}
      />
    </Form>
  );
}
