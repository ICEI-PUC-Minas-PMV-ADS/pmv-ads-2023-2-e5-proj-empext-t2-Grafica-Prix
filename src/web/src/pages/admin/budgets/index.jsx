import React, { useEffect, useState } from "react";
import Container from "../../../components/common/container";
import Divisor from "../../../components/common/divisor";
import Table from "../../../components/admin/table";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../../services/api/categories";
import { BsBookmarkCheck, BsBoxArrowUpRight } from "react-icons/bs";
import ContainerActions from "../../../components/admin/containerActions";

export default function Budgets(props) {
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
              <BsBookmarkCheck size={18} style={{ cursor: "pointer" }} />
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
        padding="0 "
        height="100%"
        direction="row"
      >
        <Divisor flex="3" height="100vh" padding="20px">
          <Table
            loading={categories.isLoading}
            data={dataWithAction}
            columns={columns}
            search
            titleSearch="Orçamentos"
            descriptionSearch="Consulte ou gerencie orçamentos"
            textTotal="orçamentos"
            heightTable="calc(100vh - 5%)"
            textNoContent="Nenhum orçamento registrado"
          />
        </Divisor>
      </Container>
    </>
  );
}
