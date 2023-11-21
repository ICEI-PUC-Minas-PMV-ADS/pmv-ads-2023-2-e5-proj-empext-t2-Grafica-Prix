import {
  ActionBudgets,
  BudgetsStyles,
  CardSugestionProducts,
  Containeractions,
  ProductBudget,
  ProductList,
} from "./styles";
import { useNavigate } from "react-router";
import Container from "../../common/container";
import Text from "../../common/text";
import { currencyFormatter } from "../../../services/priceServices";
import Collpase from "../../common/collapse";
import Form from "../../common/formComponents";
import { useEffect, useState } from "react";
import http from "../../../services/http";
import Actions from "../../common/actions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getBudgets,
  getBudgetsMostPlaced,
} from "../../../services/api/budgets";
import CarouselProducts from "../../common/carouselProducts";
import useAuth from "../../../context/auth";

export default function BudgetList() {
  const navigate = useNavigate();
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (
      !user ||
      !localStorage.getItem("id") ||
      !localStorage.getItem("token")
    ) {
      navigate("/login");
    }
  }, [user]);

  const client = useQueryClient();

  useEffect(() => {
    http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
  }, []);

  const productsInKart = useQuery({
    queryKey: ["productsInKart"],
    queryFn: getBudgets,
  });

  const productsMorePlaced = useQuery({
    queryKey: ["productsMorePlaced"],
    queryFn: getBudgetsMostPlaced,
  });

  useEffect(() => {
    let data = [];

    if (productsInKart.data?.length > 0) {
      for (let key in productsInKart.data) {
        data.push(productsInKart.data[key]?.preco);
      }
    }

    setPrices(data);
  }, [productsInKart.data]);

  function handleRequestBudgets() {
    setLoading(true);

    http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;

    http.post("/api/Orcamento/concluir-orcamento").then(
      () => {
        client.setQueryData({ queryKey: ["productsInKart"] }, []);
        setLoading(false);
      },
      () => {
        setLoading(false);
      }
    );
  }

  function handleDeleteProduct(id) {
    console.log(id);
    http.delete(`/api/Orcamento/remover-do-orcamento/${id}`).then(() => {
      client.invalidateQueries({ queryKey: ["productsInKart"] });
    });
  }

  return (
    <Container height="calc(100vh - 70px)">
      <Text size="20px" weight="600">
        Orçamentos
      </Text>
      <BudgetsStyles>
        <ProductList>
          {productsInKart.data?.map((product) => {
            return (
              <ProductBudget>
                <Actions
                  right
                  delete
                  actionDelete={() => handleDeleteProduct(product.id)}
                />
                <Text size="18px" weight="600">
                  {product.nome}
                </Text>
                <Text size="14px" weight="500">
                  {currencyFormatter(product.preco)}
                </Text>
                {product.observavao && (
                  <Collpase title="Observação" margin="10px 0 0 0">
                    <Text
                      dangerouslySetInnerHTML={{
                        __html: product.observavao,
                      }}
                    ></Text>
                  </Collpase>
                )}
              </ProductBudget>
            );
          })}
        </ProductList>
        <Containeractions>
          <ActionBudgets>
            <Form data={{}} gap="10px" onSubmit={handleRequestBudgets}>
              <Text size="14px" weight="600">
                produtos: {productsInKart.data?.length}
              </Text>
              {productsInKart.data?.length > 0 && (
                <>
                  <Text size="20px" weight="600">
                    Total:{" "}
                    {currencyFormatter(
                      prices?.reduce(
                        (accumlator, currentValue) => accumlator + currentValue,
                        0
                      )
                    )}
                  </Text>
                  <Form.Button title="Solicitar orçamento" loading={loading} />
                </>
              )}
            </Form>
          </ActionBudgets>
          <Text size="20px" weight="600">
            Produtos recomendados
          </Text>
          <CardSugestionProducts>
            <CarouselProducts
              products={productsMorePlaced.data}
              rollMeasure={150}
            />
          </CardSugestionProducts>
        </Containeractions>
      </BudgetsStyles>
    </Container>
  );
}
