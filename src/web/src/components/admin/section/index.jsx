import { SectionStyles } from "./styles";

export default function Section(props) {
  return <SectionStyles {...props}>{props.children}</SectionStyles>;
}
