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
import CardProduct from "../cardProduct";
import { useEffect, useState } from "react";
import http from "../../../services/http";

export default function BudgetList() {
  const navigate = useNavigate();
  const [productsInKart, setProductsInKart] = useState([]);

  useEffect(() => {
    http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
  }, []);

  useEffect(() => {
    http.get("/api/Orcamento/produtos-no-carrinho").then((res) => {
      setProductsInKart(res.data);
    });
  }, []);

  return (
    <Container height="calc(100vh - 100px)">
      <Text size="20px" weight="600">
        Orçamentos
      </Text>
      <BudgetsStyles>
        <ProductList>
          {productsInKart?.map((product) => {
            return (
              <ProductBudget>
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
            <Form data={{}} gap="10px">
              <Text size="14px" weight="600">
                produtos: 5
              </Text>
              <Text size="20px" weight="600">
                Total: {currencyFormatter(23.9)}
              </Text>
              <Form.Button title="Solicitar orçamento" />
            </Form>
          </ActionBudgets>
          <CardSugestionProducts>
            <CardProduct />
          </CardSugestionProducts>
        </Containeractions>
      </BudgetsStyles>
    </Container>
  );
}
