import Container from "../../../common/container";
import Divisor from "../../../common/divisor";
import Text from "../../../common/text";
import { ProductImage, SizeText } from "./styles";
import { currencyFormatter } from "../../../../services/priceServices";

export default function Details({ data }) {
  return (
    <Container gap="10px" maxWidth="100%" padding="0">
      <Text weight="600" size="20px">
        Detalhes do produto
      </Text>
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
    </Container>
  );
}
