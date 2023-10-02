import React, { useEffect, useState } from "react";
import { ContainerActions, ContainerClients } from "./styles";
import TitlePage from "../../../components/admin/titlePages";
import Container from "../../../components/container";
import Section from "../../../components/admin/section";
import Table from "../../../components/admin/table";
import { BsTrash3 } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import Divisor from "../../../components/common/divisor";
import Form from "../../../components/formComponents";

export default function Dashboard(props) {
  const [dataWithAction, setDataWithAction] = useState();
  const [modal, setModal] = useState(false);

  const titles = ["Perfil", "Email", "Data de cadastro", "Ações"];

  const data = [
    {
      pefil: <div>Teste</div>,
      email: "teste@gmail.com",
      data_cadastro: "25/02/2023",
    },
    {
      pefil: <div>Teste</div>,
      email: "teste@gmail.com",
      data_cadastro: "25/02/2023",
    },
  ];

  const columns = [
    {
      label: "Perfil",
      key: "pefil",
    },
    {
      label: "Email",
      key: "email",
    },
    {
      label: "Data de cadastro",
      key: "data_cadastro",
    },
    {
      label: "Ações",
      key: "action",
    },
  ];

  useEffect(() => {
    setDataWithAction(
      data.map((data) => {
        return {
          ...data,
          action: (
            <ContainerActions>
              <BsTrash3
                onClick={() => {
                  setModal({
                    key: "trash",
                    data: data,
                  });
                }}
              />
              <BiEditAlt
                onClick={() => {
                  setModal({
                    key: "trash",
                    data: data,
                  });
                }}
              />
            </ContainerActions>
          ),
        };
      })
    );
  }, []);

  return (
    <>
      <Container gap="10px" height="100%">
        <TitlePage>Painel</TitlePage>
        <Section></Section>
        <Section flex="2">
          <Divisor>
            <ContainerClients>
              <Form>
                <Form.Input name="search" />
              </Form>
              <Table titles={titles} data={dataWithAction} columns={columns} />
            </ContainerClients>
          </Divisor>
        </Section>
      </Container>
    </>
  );
}
