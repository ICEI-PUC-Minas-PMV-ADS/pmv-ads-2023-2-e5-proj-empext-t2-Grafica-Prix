import FilledButton from "../button";

export default function Button(props) {
  return (
    <FilledButton
      minWidth={props.width}
      color={props.color ? props.color : "purple"}
      type={props.type || "submit"}
      padding={props.padding || "10px"}
      margin={props.margin}
      loading={props.loading}
    >
      {props.title}
    </FilledButton>
  );
}
