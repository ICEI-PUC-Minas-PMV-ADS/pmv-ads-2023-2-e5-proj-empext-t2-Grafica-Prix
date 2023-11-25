import React from "react";
import Text from "../../../common/text";
import Container from "../../../common/container";

export default function Details({ data }) {
  const permissions = ["Consultor", "Gestor", "Administrador"];

  return (
    <Container gap="10px" maxWidth="100%" padding="0">
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
      <Text size="12px" weight="500">
        <b>Permissão:</b> {permissions[data?.permissao]}
      </Text>
    </Container>
  );
}
