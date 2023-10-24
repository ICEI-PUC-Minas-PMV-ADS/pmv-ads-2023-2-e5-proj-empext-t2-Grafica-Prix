import { CardStyles, ImageProduct } from "./styles";
import Text from "../../common/text";
import { useNavigate } from "react-router";
import { currencyFormatter } from "../../../services/priceServices";

export default function CardProduct({ product }) {
  const navigate = useNavigate();

  return (
    <CardStyles
      {...product}
      onClick={() =>
        navigate(`/product`, {
          state: {
            product: product,
          },
        })
      }
    >
      <ImageProduct src={`data:image/png;base64, ${product?.imagem}`} />
      <Text>{product?.nome}</Text>
      <Text size="18px" weight="600">
        {currencyFormatter(product?.preco)}
      </Text>
    </CardStyles>
  );
}
