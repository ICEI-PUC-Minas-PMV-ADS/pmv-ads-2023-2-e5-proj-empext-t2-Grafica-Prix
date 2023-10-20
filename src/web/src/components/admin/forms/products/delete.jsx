import React, { useState } from "react";
import Form from "../../../common/formComponents";
import http from "../../../../services/http";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Text from "../../../common/text";
import Divisor from "../../../common/divisor";
import { ProductImage, SizeText } from "./styles";
import { currencyFormatter } from "../../../../services/priceServices";

export default function Delete({ data, setModal }) {
  const [loading, setLoading] = useState(false);

  const client = useQueryClient();

  function handleSubmit() {
    setLoading(true);

    http.delete(`api/Produto/${data?.id}`, data?.id).then(
      () => {
        setLoading(false);
        client.invalidateQueries({ queryKey: ["products"] });
        toast.success("Produto deletado com sucesso");
        setModal(false);
      },
      () => {
        setLoading(false);
        toast.error("Erro ao deletar produto");
      }
    );
  }

  return (
    <Form
      data={{ id: data?.id }}
      onSubmit={handleSubmit}
      gap="10px"
      margin="10px 0"
    >
      <Text size="20px" weight="600">
        {data?.nome}
      </Text>
      <ProductImage src={`data:image/png;base64,${data.imagem}`} />

      <Divisor gap="5px" borderBottom margin="20px 0 0 0">
        <Text weight="600" size="16px">
          Preço:
        </Text>
        <Text size="16px">{currencyFormatter(data?.preco)}</Text>
      </Divisor>

      <Divisor gap="5px" borderBottom margin="20px 0 0 0">
        <Text weight="600" size="16px">
          Quantidade:
        </Text>
        <Text size="16px">{data?.quantidade}</Text>
      </Divisor>

      <Divisor direction="column" gap="5px" borderBottom margin="20px 0 0 0">
        <Text weight="600" size="16px">
          Descrição:
        </Text>
        <SizeText>
          <Text
            size="20px"
            weight="500"
            dangerouslySetInnerHTML={{
              __html: data?.descricao,
            }}
          ></Text>
        </SizeText>
      </Divisor>

      <Divisor gap="5px" borderBottom margin="20px 0 0 0">
        <Text weight="600" size="16px">
          Promoção:
        </Text>
        <SizeText>
          <Text
            size="20px"
            weight="500"
            dangerouslySetInnerHTML={{
              __html: data?.promocao,
            }}
          ></Text>
        </SizeText>
      </Divisor>
      <Form.Button
        type="submit"
        title="Deletar"
        minWidth="fit-content"
        padding="10px 30px"
        margin="5px 0 0 0"
        loading={loading}
      />
    </Form>
  );
}
