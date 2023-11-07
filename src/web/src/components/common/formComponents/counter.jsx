import React, { useState } from "react";
import { ButtonCounter } from "./styles";
import { InputGroup, Label, ErrorMessage } from "./styles";
import { Field } from "formik";
import Divisor from "../divisor";
import Text from "../text";

export default function Counter({
  name,
  placeHolder,
  label,
  maxWidth,
  marginCenter,
  maxValue,
}) {
  const [counter, setCounter] = useState(0);

  return (
    <Field name={name} placeHolder={placeHolder}>
      {({ field, form, meta }) => (
        <InputGroup
          maxWidth={maxWidth}
          marginCenter={marginCenter}
          padding="10px 0"
        >
          {label && <Label>{label}</Label>}
          <Divisor alignItems="center">
            <ButtonCounter
              onClick={() => {
                if (counter === 0) return;
                setCounter((old) => old - 1);
                form.setFieldValue(name, counter);
              }}
            >
              -
            </ButtonCounter>
            <Text size="14px">{field.value}</Text>
            <ButtonCounter
              onClick={() => {
                if (counter === maxValue) return;
                setCounter((old) => old + 1);
                form.setFieldValue(name, counter);
              }}
            >
              +
            </ButtonCounter>
          </Divisor>
          {meta.error && <ErrorMessage>{meta.error}</ErrorMessage>}
        </InputGroup>
      )}
    </Field>
  );
}
