import React, { useEffect, useState } from "react";
import { BudgetsStyles } from "./styles";
import Text from "../../common/text";
import {
  currencyFormatter,
  percentagePromotion,
} from "../../../services/priceServices";
import Divisor from "../../common/divisor";
import { PromotionAlert } from "../cardProduct/styles";
import Form from "../../common/formComponents";
import http from "../../../services/http";
import { useNavigate } from "react-router";

export default function Budget({ product }) {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
  }, []);

  function handleSubmit(values) {
    setLoading(true);

    const data = {
      ...product,
      quantidade: values.quantidade,
      observacao: values.observacao,
    };

    http.post("/api/Orcamento/adicionar-ao-orcamento/", data).then(
      () => {
        setLoading(false);
        navigate("/budgets");
      },
      () => {
        setLoading(false);
      }
    );
  }

  return (
    <BudgetsStyles>
      <Form data={{ quantidade: 0, observacao: "" }} onSubmit={handleSubmit}>
        <Text size="25px" weight="600" margin="0 0 5px 0">
          {product.nome}
        </Text>
        {product.promocao && (
          <Divisor width="fit-content" alignItems="center">
            <Text size="20px" weight="600">
              {currencyFormatter(product.promocao)}
            </Text>
            <PromotionAlert relative>
              <Text size="10px" weight="600" color="#fff">
                {percentagePromotion(product)}% de desconto
              </Text>
            </PromotionAlert>
          </Divisor>
        )}
        {!product.promocao && (
          <Text
            lineThrough={product.promocao}
            color="#FF5757"
            size="25px"
            weight="600"
          >
            {currencyFormatter(product.preco)}
          </Text>
        )}

        <Divisor gap="5px">
          <Text size="14px" weight="500">
            Quantidade em estoque:{" "}
          </Text>
          <Text size="14px" weight="500" color="#FF5757">
            {product.quantidade}
          </Text>
        </Divisor>
        <Form.Counter
          name="quantidade"
          label="Quantidade"
          maxValue={product.quantidade}
        />
        <Form.Editor name="observacao" label="Observação" />
        <Form.Button
          type="submit"
          title="Confirmar"
          minWidth="fit-content"
          padding="10px 30px"
          margin="5px 0 0 0"
          loading={loading}
        />
      </Form>
    </BudgetsStyles>
  );
}
