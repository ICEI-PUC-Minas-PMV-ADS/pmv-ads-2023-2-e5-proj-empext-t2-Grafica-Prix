import { ImageAbout } from "./styles";
import Text from "../../../components/common/text";
import { useQuery } from "@tanstack/react-query";
import { getAboutUs } from "../../../services/api/aboutUs";
import Container from "../../../components/common/container";

export default function AboutUs(props) {
  const aboutUs = useQuery({
    queryKey: ["aboutUs"],
    queryFn: getAboutUs,
  });

  return (
    <>
      <ImageAbout src="" />
      {aboutUs.data && (
        <Container gap="10px" height="100%">
          <Text size="25px" weight="600">
            {aboutUs.data[0]?.titulo}
          </Text>
          <Text
            size="16px"
            dangerouslySetInnerHTML={{
              __html: aboutUs.data[0]?.descricao,
            }}
          ></Text>
        </Container>
      )}
    </>
  );
}
