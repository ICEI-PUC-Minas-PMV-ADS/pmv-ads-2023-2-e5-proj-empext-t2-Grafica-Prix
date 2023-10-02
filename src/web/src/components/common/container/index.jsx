import { ContainerStyles } from "./styles";

export default function Container(props) {
  return <ContainerStyles {...props}>{props.children}</ContainerStyles>;
}
