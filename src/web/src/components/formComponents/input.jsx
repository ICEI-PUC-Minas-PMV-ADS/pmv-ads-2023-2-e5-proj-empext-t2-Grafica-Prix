import {
  InputGroup,
  InputStyle,
  Label,
  ErrorMessage,
  RequiredAsterisk,
  ContainerEye,
} from "./styles";
import { Field } from "formik";
import { useState } from "react";
import { PiEyeLight, PiEyeSlashLight } from "react-icons/pi";

export default function Input({
  name,
  placeHolder,
  search,
  label,
  type,
  min,
  required,
}) {
  const [showPassowd, setShowPassord] = useState(false);

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
            type={(showPassowd ? "text" : type) || "text"}
            search={search}
            placeholder={placeHolder}
            name={name}
            value={field.value}
            onChange={form.handleChange}
            min={min}
          />
          {type === "password" && (
            <ContainerEye
              onClick={() => setShowPassord(!showPassowd)}
              errorMessage={meta.error}
            >
              {showPassowd ? (
                <PiEyeLight size={20} />
              ) : (
                <PiEyeSlashLight size={20} />
              )}
            </ContainerEye>
          )}
          {meta.error && <ErrorMessage>{meta.error}</ErrorMessage>}
        </InputGroup>
      )}
    </Field>
  );
}
