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

    http.delete(`api/Usuario/${data?.id}`, data?.id).then(
      () => {
        setLoading(false);
        client.invalidateQueries({ queryKey: ["clients"] });
        toast.success("Cliente deletado com sucesso");
        setModal(false);
      },
      () => {
        setLoading(false);
        toast.error("Erro ao deletar cliente");
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
      <Text size="12px" weight="500">
        <b>Nome:</b> {data?.name}
      </Text>
      <Text size="12px" weight="500">
        <b>Email:</b> {data?.email}
      </Text>
      <Text size="12px" weight="500">
        <b>Telefone:</b> {data?.telefone}
      </Text>
      <Text size="12px" weight="500">
        <b>CPF:</b> {data?.cpf}
      </Text>
      <Text size="12px" weight="500">
        <b>Endereco:</b> {data?.endereco}
      </Text>
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
