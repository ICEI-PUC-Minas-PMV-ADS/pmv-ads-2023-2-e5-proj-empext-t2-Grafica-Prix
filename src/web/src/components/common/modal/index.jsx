import {
  BackgroundModal,
  ContainerBtn,
  ContainerPage,
  Overlay,
} from "./styles";
import { IoMdClose } from "react-icons/io";

export default function Modal(props) {
  return (
    <BackgroundModal {...props}>
      <Overlay
        transparent={props.transparent}
        onClick={() => props.setModal(false)}
      />
      <ContainerPage width={props.width}>
        <ContainerBtn>
          <button onClick={() => props.setModal(false)}>
            <IoMdClose color={"#8463A9"} />
          </button>
        </ContainerBtn>
        {props.children}
      </ContainerPage>
    </BackgroundModal>
  );
}
