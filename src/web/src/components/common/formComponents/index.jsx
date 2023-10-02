import { Formik } from "formik";
import { FormContainer } from "./styles";
import Input from "./input";
import Button from "./button";
import AlignContent from "./alignContent";

export default function Form({
  children,
  onSubmit,
  onClear,
  data,
  validationSchema,
  padding,
  gap,
  innerRef,
  width,
}) {
  return (
    <Formik
      innerRef={innerRef}
      onSubmit={onSubmit}
      onReset={onClear}
      initialValues={data}
      validationSchema={validationSchema}
      validateOnMount={false}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {(props) => (
        <FormContainer
          padding={padding}
          onSubmit={props.handleSubmit}
          gap={gap}
          width={width}
        >
          {children}
        </FormContainer>
      )}
    </Formik>
  );
}

Form.Input = Input;
Form.Button = Button;
Form.AlignContent = AlignContent;
