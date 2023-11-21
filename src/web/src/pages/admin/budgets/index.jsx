import React, { useEffect, useState } from "react";
import Container from "../../../components/common/container";
import Divisor from "../../../components/common/divisor";
import Table from "../../../components/admin/table";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BsBookmarkCheck, BsBoxArrowUpRight } from "react-icons/bs";
import ContainerActions from "../../../components/admin/containerActions";
import { getBudgetsList } from "../../../services/api/budgets";
import { getClients } from "../../../services/api/user";
import moment from "moment";
import http from "../../../services/http";
import { toast } from "react-toastify";

export default function Budgets(props) {
  const [dataWithAction, setDataWithAction] = useState();
  const [modal, setModal] = useState(false);

  const client = useQueryClient();

  const budgets = useQuery({
    queryKey: ["budgets"],
    queryFn: getBudgetsList,
  });

  const clients = useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
  });

  const columns = [
    {
      label: "Data de solicitação",
      key: "dataCriacao",
    },
    {
      label: "Cliente",
      key: "usuarioId",
    },
    {
      label: "Ações",
      key: "action",
    },
  ];

  function checkBudget(id, status) {
    http
      .patch(`/api/Orcamento/orcamento/${id}/atualizar-status`, {
        fechado: !status,
      })
      .then(() => {
        toast.success("Orçamento checado com sucesso");
        client.invalidateQueries({ queryKey: ["budgets"] });
      });
  }

  useEffect(() => {
    setDataWithAction(
      budgets.data?.map((data) => {
        console.log(data.fechado);
        return {
          ...data,
          dataCriacao: moment(data.dataCriacao).format("DD/MM/YYYY - hh:mm"),
          usuarioId: clients.data?.find(
            (x) => x.id === parseInt(data.usuarioId)
          )?.name,
          action: (
            <ContainerActions>
              <BsBookmarkCheck
                onClick={() => checkBudget(data.id, data.fechado)}
                size={18}
                color={data.fechado ? "red" : ""}
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
  }, [budgets.data]);

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
            loading={budgets.isLoading}
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
