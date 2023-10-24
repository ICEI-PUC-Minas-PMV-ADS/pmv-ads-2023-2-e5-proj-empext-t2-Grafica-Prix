import { Formik } from "formik";
import { FormContainer } from "./styles";
import Input from "./input";
import Button from "./button";
import AlignContent from "./alignContent";
import EditorForm from "./editor";
import SelectForm from "./select";
import InputPrice from "./inputPrice";
import File from "./file";
import Number from "./number";
import Counter from "./counter";

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
  margin,
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
          margin={margin}
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
Form.Editor = EditorForm;
Form.Select = SelectForm;
Form.InputPrice = InputPrice;
Form.File = File;
Form.Number = Number;
Form.Counter = Counter;
