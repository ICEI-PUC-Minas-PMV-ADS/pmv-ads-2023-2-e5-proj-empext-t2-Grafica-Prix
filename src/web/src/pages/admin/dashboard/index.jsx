import React, { useEffect, useState } from "react";
import { ContainerActions, ContainerData } from "./styles";
import TitlePage from "../../../components/admin/titlePages";
import Container from "../../../components/common/container";
import Section from "../../../components/admin/section";
import Table from "../../../components/admin/table";
import { BsTrash3 } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import Divisor from "../../../components/common/divisor";
import Form from "../../../components/common/formComponents";
import Text from "../../../components/common/text";
import CardProduct from "../../../components/client/cardProduct";
import SwiperComponent from "../../../components/common/swiper";
import { SwiperSlide } from "swiper/react";

export default function Dashboard(props) {
  const [dataWithAction, setDataWithAction] = useState();
  const [modal, setModal] = useState(false);

  const titles = ["Perfil", "Email", "Data de cadastro", "Ações"];

  let data = [];
  let cards = [];

  for (let i = 0; i < 10; i++) {
    data.push({
      pefil: <div>Teste</div>,
      email: "teste@gmail.com",
      data_cadastro: "25/02/2023",
    });
  }

  for (let i = 0; i < 10; i++) {
    cards.push({
      image: "",
      name: "Nome do produto",
      price: "RS 99,90",
    });
  }

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
          <Divisor gap="30px">
            <ContainerData>
              <Text size="20px" weight="600">
                Clientes
              </Text>
              <Divisor justifyContent="space-between">
                <Text>Consulte ou gerencie seus clientes</Text>
                <Text>Total de clientes: 13</Text>
              </Divisor>
              <Form>
                <Form.Input
                  name="search"
                  placeHolder="Pesquisar cliente..."
                  search
                  border="none"
                  shadow
                />
              </Form>
              <Table
                titles={titles}
                data={dataWithAction}
                height="100%"
                columns={columns}
                margin="10px 0 0 0"
              />
            </ContainerData>
            <ContainerData>
              <Text size="20px" weight="600">
                Produtos mais procurados
              </Text>
              <Text>Lista de produtos com mais acessos</Text>
              <SwiperComponent slidesPerView={3}>
                {cards?.map((card, index) => {
                  return (
                    <SwiperSlide key={index + 10023332}>
                      <CardProduct
                        url={card.image}
                        name={card.name}
                        price={card.price}
                      />
                    </SwiperSlide>
                  );
                })}
              </SwiperComponent>
            </ContainerData>
          </Divisor>
        </Section>
      </Container>
    </>
  );
}
