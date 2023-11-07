import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlinePhone,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { FooterStyles, FooterBase, FooterSocial } from "./styles";
import Text from "../../common/text";

export default function Footer() {
  return (
    <FooterStyles>
      <FooterBase>
        <FooterSocial>
          <AiOutlineInstagram color="FF5757" cursor="pointer" size={30} />
          <AiOutlineFacebook color="FF5757" cursor="pointer" size={30} />
          <AiOutlineWhatsApp color="FF5757" cursor="pointer" size={30} />
          <AiOutlinePhone color="FF5757" cursor="pointer" size={30} />
        </FooterSocial>
        <Text size={14}>Termos e Privacidade - 2023</Text>
      </FooterBase>
    </FooterStyles>
  );
}
