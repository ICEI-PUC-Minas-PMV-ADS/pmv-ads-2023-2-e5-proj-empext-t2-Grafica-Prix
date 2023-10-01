import React, { useState } from "react";
import {} from "./styles";
import TitlePage from "../../../components/admin/titlePages";
import Container from "../../../components/container";
import Section from "../../../components/admin/section";
import Table from "../../../components/admin/table";

export default function Dashboard(props) {
  const titles = ["Perfil", "Email", "Data de cadastro", "Ações"];

  const data = [
    {
      pefil: "teste",
      email: "teste@gmail.com",
      data_cadastro: "25/02/2023",
    },
    {
      pefil: "teste",
      email: "teste@gmail.com",
      data_cadastro: "25/02/2023",
    },
  ];

  const rows = data.length;

  const columns = [
    {
      label: "Data de cadastro",
      key: "data_cadastro",
    },
    {
      label: "Perfil",
      key: "pefil",
    },
    {
      label: "Email",
      key: "email",
    },
  ];

  return (
    <Container gap="10px" height="100%">
      <TitlePage>Painel</TitlePage>
      <Section></Section>
      <Section flex="2">
        <Table titles={titles} data={data} rows={rows} columns={columns} />
      </Section>
    </Container>
  );
}
