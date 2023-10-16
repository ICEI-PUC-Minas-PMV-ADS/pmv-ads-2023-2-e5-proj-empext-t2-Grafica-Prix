import { useEffect, useRef } from "react";
import { InputGroup, Label, RequiredAsterisk, selectStyles } from "./styles";
import Select, { components } from "react-select";
import { Field } from "formik";
import { ErrorMessage } from "./styles";
import { useState } from "react";

export default function Select(
  {
    options,
    name,
    label,
    isLoading,
    isSearchable,
    clear,
    isDisabled,
    isMulti,
    placeHolder,
    isClearable,
    selectValue,
    onChange,
    required,
    sections,
  } = { isMulti: false }
) {
  const [valueSections, setValueSections] = useState([]);
  const selectRef = useRef();
  const textAll = ["applications", "custom_status", "status"];

  useEffect(() => {
    if (clear) {
      selectRef.current.clearValue();
    }
  }, [clear]);

  const NoOptionsMessage = (props) => {
    return (
      <components.NoOptionsMessage {...props}>
        <span className="custom-css-class">Sem opções</span>
      </components.NoOptionsMessage>
    );
  };

  return (
    <Field name={name} placeHolder={placeHolder}>
      {({ field, form, meta }) => (
        <InputGroup>
          {label && <Label>{label}</Label>}
          {required && <RequiredAsterisk>*</RequiredAsterisk>}
          <Select
            ref={selectRef}
            classNamePrefix="select"
            value={
              sections && isMulti
                ? valueSections
                : isMulti
                ? options?.filter((x) => field.value?.includes(x.value))
                : options?.find((x) => x.value === field.value)
            }
            components={{ NoOptionsMessage }}
            isLoading={isLoading}
            cacheOptions
            loadOptions={isLoading}
            isSearchable={isSearchable}
            isClearable={isClearable}
            name={name}
            options={options}
            isDisabled={isDisabled}
            styles={selectStyles}
            isMulti={isMulti}
            menuPosition={"absolute"}
            placeholder={placeHolder}
            onChange={(value, { action, removedValue }) => {
              let itensSections = [...valueSections];
              let newItem = value.length - 1;

              if (sections && action === "clear") {
                setValueSections([]);
              }

              if (sections && action === "remove-value" && removedValue) {
                let filter = itensSections.filter(
                  (x) => x.value !== removedValue.value
                );
                setValueSections(filter);
                return;
              }

              if (isMulti && value?.length > 0) {
                if (sections) {
                  itensSections.push(value[newItem]);
                  setValueSections(itensSections);
                }

                form.setFieldValue(
                  name,
                  value.map((opt) => opt.value)
                );
              } else {
                form.setFieldValue(name, value?.value);
                if (selectValue) {
                  selectValue(value?.value);
                }
              }

              if (onChange) {
                onChange(value);
              }
            }}
            theme={(theme) => ({
              ...theme,
              borderRadius: 5,
              colors: {
                ...theme.colors,
                primary: "#8463a9",
                primary25: "#e1e1e1",
              },
            })}
          />
          {meta.error && <ErrorMessage>{meta.error}</ErrorMessage>}
        </InputGroup>
      )}
    </Field>
  );
}
