import FilledButton from "../button";

export default function Button(props) {
  return (
    <FilledButton
      width={props.width}
      color={props.color ? props.color : "purple"}
      type={props.type || "submit"}
      padding={props.padding || "10px"}
      loading={props.loading}
    >
      {props.title}
    </FilledButton>
  );
}
