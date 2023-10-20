import {
  InputGroup,
  InputStyle,
  Label,
  ErrorMessage,
  RequiredAsterisk,
} from "./styles";
import { Field } from "formik";
export default function Number({
  name,
  placeHolder,
  search,
  label,
  min,
  required,
  maxWidth,
  marginCenter,
  border,
  shadow,
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
          <InputStyle
            {...field}
            type="number"
            search={search}
            placeholder={placeHolder}
            name={name}
            value={field.value}
            onChange={form.handleChange}
            min={min}
            border={border}
            shadow={shadow}
          />
          {meta.error && <ErrorMessage>{meta.error}</ErrorMessage>}
        </InputGroup>
      )}
    </Field>
  );
}
