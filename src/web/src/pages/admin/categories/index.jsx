import React, { useEffect, useState } from "react";
import Container from "../../../components/common/container";
import Divisor from "../../../components/common/divisor";
import Table from "../../../components/admin/table";
import Text from "../../../components/common/text";
import Register from "../../../components/admin/forms/categories/register";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../../services/api/categories";
import { BsBoxArrowUpRight, BsTrash3 } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import ContainerActions from "../../../components/admin/containerActions";
import Modal from "../../../components/common/modal";
import Edit from "../../../components/admin/forms/categories/edit";
import Delete from "../../../components/admin/forms/categories/delete";
import Details from "../../../components/admin/forms/categories/detail";

export default function Categories(props) {
  const [dataWithAction, setDataWithAction] = useState();
  const [modal, setModal] = useState(false);

  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const columns = [
    {
      label: "Nome",
      key: "nome",
    },
    {
      label: "Descrição",
      key: "descricao",
      html: true,
    },
    {
      label: "Ações",
      key: "action",
    },
  ];

  useEffect(() => {
    setDataWithAction(
      categories.data?.map((data) => {
        return {
          ...data,
          action: (
            <ContainerActions>
              <BsTrash3
                size={18}
                onClick={() => {
                  setModal({
                    key: "delete",
                    data: data,
                  });
                }}
                style={{ cursor: "pointer" }}
              />
              <BiEditAlt
                size={18}
                onClick={() => {
                  setModal({
                    key: "edit",
                    data: data,
                  });
                }}
                style={{ cursor: "pointer" }}
              />
              <BsBoxArrowUpRight
                size={18}
                onClick={() => {
                  setModal({
                    key: "details",
                    data: data,
                  });
                }}
                style={{ cursor: "pointer" }}
              />
            </ContainerActions>
          ),
        };
      })
    );
  }, [categories.data]);

  return (
    <>
      <Container
        gap="10px"
        maxWidth="100%"
        padding="0 0 0 20px"
        height="100%"
        direction="row"
      >
        <Divisor flex="3" height="100vh" padding="20px 0 0 0">
          <Table
            loading={categories.isLoading}
            data={dataWithAction}
            columns={columns}
            search
            titleSearch="Categorias"
            descriptionSearch="Consulte ou gerencie seus produtos"
            textTotal="produtos"
            heightTable="calc(100vh - 5%)"
          />
        </Divisor>
        <Divisor
          flex="2"
          direction="column"
          height="100vh"
          bgColor="#fff"
          boxShadow
          padding="20px"
        >
          <Text size="20px" weight="600">
            Cadastrar nova categoria
          </Text>
          <Text size="14px" weight="500">
            Informe o nome e uma descrição (opcional) para sua categoria.
          </Text>
          <Register />
        </Divisor>
      </Container>
      {modal?.key === "edit" && (
        <Modal setModal={setModal} width="40%">
          <Text size="20px" weight="600">
            Editar categoria
          </Text>
          <Text size="14px" weight="500">
            Edite o nome e a descrição (opcional) da categoria.
          </Text>
          <Edit data={modal?.data} setModal={setModal} />
        </Modal>
      )}
      {modal?.key === "delete" && (
        <Modal setModal={setModal} width="40%">
          <Text size="20px" weight="600">
            Deletar categoria
          </Text>
          <Text size="14px" weight="500">
            Tem certeza que deseja deletar a categoria:
          </Text>
          <Delete data={modal?.data} setModal={setModal} />
        </Modal>
      )}
      {modal?.key === "details" && (
        <Modal setModal={setModal} width="40%">
          <Details data={modal?.data} />
        </Modal>
      )}
    </>
  );
}
