import React, { useEffect, useState } from "react";
import Container from "../../../components/common/container";
import Divisor from "../../../components/common/divisor";
import Table from "../../../components/admin/table";
import Text from "../../../components/common/text";
import Register from "../../../components/admin/forms/categories/register";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../../services/api/categories";
import { BsTrash3 } from "react-icons/bs";
import { BiEditAlt } from "react-icons/bi";
import ContainerActions from "../../../components/admin/containerActions";

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
                size={25}
                onClick={() => {
                  setModal({
                    key: "trash",
                    data: data,
                  });
                }}
              />
              <BiEditAlt
                size={25}
                onClick={() => {
                  setModal({
                    key: "editUser",
                    data: data,
                  });
                }}
              />
            </ContainerActions>
          ),
        };
      })
    );
  }, [categories.data]);

  return (
    <Container gap="10px" padding="0 0 0 20px" height="100%" direction="row">
      <Divisor flex="3" height="100vh">
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
        <Text size="12px" weight="500">
          Informe o nome e uma descrição (opcional) para sua categoria.
        </Text>
        <Register />
      </Divisor>
    </Container>
  );
}
