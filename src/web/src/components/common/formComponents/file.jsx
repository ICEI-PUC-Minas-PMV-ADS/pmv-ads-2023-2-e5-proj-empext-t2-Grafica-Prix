import React, { useRef, useState } from "react";
import {
  ButtonAddFile,
  ContainerUpFiled,
  ErrorMessage,
  InputStyle,
  InputGroup,
  Label,
  NameFile,
  Preview,
  ContainerPreview,
  ContainerAddImage,
  ContainerTrash,
  ContainerTextDeleteImage,
} from "./styles";
import { CgTrash } from "react-icons/cg";
import { BsFileEarmarkText, BsFillTrashFill } from "react-icons/bs";
import { Field } from "formik";
import { GoPlus } from "react-icons/go";
import Text from "../text";
import { BiImageAdd } from "react-icons/bi";

export default function File({ name, label, multiple, imageDefault }) {
  const [imagePreview, setImagePreview] = useState(
    imageDefault ? `data:image/png;base64,${imageDefault}` : null
  );
  const [messageDeleteImage, setMessageDeleteImage] = useState(false);
  const fileRef = useRef();

  function handleFileRef() {
    fileRef.current.click();
  }

  return (
    <>
      <Text>Dimensão de imagem recomendada: 600x600 pixels</Text>
      <Text>(Só é permitido arquivos do tipo JPEG ou PNG)</Text>

      <ContainerPreview>
        {imagePreview ? (
          <>
            <Preview src={imagePreview} />
            <ContainerTrash
              onClick={() => {
                setImagePreview(null);
                setMessageDeleteImage(false);
              }}
              onMouseEnter={() => setMessageDeleteImage(true)}
              onMouseLeave={() => setMessageDeleteImage(false)}
            >
              <BsFillTrashFill size={18} color="#fff" />
            </ContainerTrash>
            {messageDeleteImage && imagePreview && (
              <ContainerTextDeleteImage>
                <Text color="#fff">Deletar imagem</Text>
              </ContainerTextDeleteImage>
            )}
          </>
        ) : (
          <ContainerAddImage onClick={handleFileRef}>
            <BiImageAdd size={80} color="#0004" />
          </ContainerAddImage>
        )}
      </ContainerPreview>

      <Field name={name} label={label} type="file">
        {({ field, form, meta }) => (
          <InputGroup>
            <InputStyle
              ref={fileRef}
              type="file"
              id="files"
              name={name}
              multiple={multiple}
              hidden
              onChange={(e) => {
                let data = [];

                if (multiple) {
                  for (let key in e.target.files) {
                    data.push(e.target.files[key]);
                  }
                }

                let files = data?.slice(0, -2);

                form.setFieldValue(name, multiple ? files : e.target.files[0]);

                setImagePreview(URL.createObjectURL(e.target.files[0]));
              }}
              accept=".png, .jpeg"
            />

            {meta.error && <ErrorMessage>{meta.error}</ErrorMessage>}
          </InputGroup>
        )}
      </Field>
    </>
  );
}
