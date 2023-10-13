import { DivisorStyles } from "./styles";

export default function Divisor(props) {
  return <DivisorStyles {...props}>{props.children}</DivisorStyles>;
}
