import { InputGroup, Label, RequiredAsterisk } from "./styles";
import { Field } from "formik";
import { ErrorMessage } from "./styles";
import IntlCurrencyInput from "react-intl-currency-input";

export default function InputPrice({ name, label, placeHolder, required }) {
  const currencyConfig = {
    locale: "pt-BR",
    formats: {
      number: {
        BRL: {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      },
    },
  };

  return (
    <Field name={name} placeHolder={placeHolder}>
      {({ field, form, meta }) => (
        <InputGroup>
          {label && <Label>{label}</Label>}
          {required && <RequiredAsterisk>*</RequiredAsterisk>}
          <IntlCurrencyInput
            currency="BRL"
            config={currencyConfig}
            defaultValue={field.value}
            style={{
              padding: "9px",
              borderRadius: "5px",
              border: "1px solid #e1e1e1",
              color: "#505050",
              outline: "none",
            }}
            onChange={(event, value) => {
              form.setFieldValue(name, value);
            }}
          />
          {meta.error && <ErrorMessage>{meta.error}</ErrorMessage>}
        </InputGroup>
      )}
    </Field>
  );
}
