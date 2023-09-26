import { InputGroup, InputStyle, Label, ErrorMessage } from "./styles";
import { Field } from "formik";

export default function Input({
  name,
  placeHolder,
  search,
  label,
  type,
  min,
  required,
}) {
  return (
    <Field name={name} placeHolder={placeHolder}>
      {({ field, form, meta }) => (
        <InputGroup>
          {label && (
            <Label>
              {label}
              {required && <RequiredAsterisk>*</RequiredAsterisk>}
            </Label>
          )}
          <InputStyle
            {...field}
            type={type || "text"}
            search={search}
            placeholder={placeHolder}
            name={name}
            value={field.value}
            onChange={form.handleChange}
            min={min}
          />
          {meta.error && <ErrorMessage>{meta.error}</ErrorMessage>}
        </InputGroup>
      )}
    </Field>
  );
}
