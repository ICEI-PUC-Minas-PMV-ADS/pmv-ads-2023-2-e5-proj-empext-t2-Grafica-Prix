import { TextStyles } from "./styles";

export default function Text(props) {
  return <TextStyles {...props}>{props.children}</TextStyles>;
}
