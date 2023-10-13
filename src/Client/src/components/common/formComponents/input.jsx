import {
  InputGroup,
  InputStyle,
  Label,
  ErrorMessage,
  RequiredAsterisk,
  ContainerEye,
  Search,
} from "./styles";
import { Field } from "formik";
import { useState } from "react";
import { PiEyeLight, PiEyeSlashLight } from "react-icons/pi";
import { AiOutlineSearch } from "react-icons/ai";

export default function Input({
  name,
  placeHolder,
  search,
  label,
  type,
  min,
  required,
  maxWidth,
  marginCenter,
  border,
  shadow,
}) {
  const [showPassowd, setShowPassord] = useState(false);

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
          {search && (
            <Search>
              <AiOutlineSearch size={20} color="#FF5757" />
            </Search>
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
            border={border}
            shadow={shadow}
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
