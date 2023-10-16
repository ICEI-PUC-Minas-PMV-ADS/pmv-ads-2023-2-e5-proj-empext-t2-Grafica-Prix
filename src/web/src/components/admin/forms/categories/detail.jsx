import Text from "../../../common/text";

export default function Details({ data }) {
  return (
    <>
      <Text size="20px" weight="600">
        {data?.nome}
      </Text>
      <Text
        size="12px"
        weight="500"
        dangerouslySetInnerHTML={{
          __html: data?.descricao,
        }}
      ></Text>
    </>
  );
}
