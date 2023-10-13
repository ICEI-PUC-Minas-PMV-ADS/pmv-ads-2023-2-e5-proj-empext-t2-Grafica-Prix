import { InputGroup, Label, ErrorMessage, RequiredAsterisk } from "./styles";
import { Field } from "formik";
import { Editor } from "primereact/editor";

export default function EditorForm({
  name,
  placeHolder,
  label,
  required,
  maxWidth,
  marginCenter,
  height,
}) {
  return (
    <Field name={name} placeHolder={placeHolder}>
      {({ field, form, meta }) => (
        <InputGroup maxWidth={maxWidth} marginCenter={marginCenter}>
          {label && (
            <Label>
              {label}
              {required && <RequiredAsterisk>*</RequiredAsterisk>}
            </Label>
          )}
          <Editor
            value={field.value}
            name={name}
            onTextChange={(e) => form.setFieldValue(name, e.htmlValue)}
            style={{ height: height || "220px" }}
          />

          {meta.error && <ErrorMessage>{meta.error}</ErrorMessage>}
        </InputGroup>
      )}
    </Field>
  );
}
