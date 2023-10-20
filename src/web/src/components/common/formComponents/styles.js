import styled from "styled-components";

export const TitleStyle = styled.p`
  font-size: 18px;
  font-weight: 700;
`;

export const FormContainer = styled.form`
  display: flex;
  gap: ${(props) => props.gap || "0"};
  flex-direction: column;
  padding: ${(props) => props.padding || "0"};
  width: ${(props) => props.width || "100%"};
  position: relative;
  margin: ${(props) => props.margin};
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.justify || "unset"};
  gap: ${(props) => props.gap || "5px"};
  position: relative;
  max-width: ${(props) => props.maxWidth};
  width: ${(props) => (props.width === "fit" ? "fit-content" : "100%")};
  align-items: ${(props) => props.align || "unset"};
  margin: ${(props) => {
    if (props.marginCenter) return "0 auto";
    else return props.margin;
  }};

  .select__control {
    height: auto;
  }

  .tags-input {
    width: 100%;
    padding: 5px;
    font-size: 12px;
    outline: none;
    box-shadow: none;
    border: 1px solid #e1e1e1;

    :hover {
      border: 1px solid #e1e1e1;
    }
  }

  input[type="date"]::-webkit-calendar-picker-indicator {
    opacity: 0;
    cursor: pointer;
    position: relative;
  }

  input[type="radio"] {
    accent-color: #8463a9;
  }
`;

export const InputStyle = styled.input`
  width: 100%;
  padding: ${(props) => (props.search ? "10px" : "7px 10px")};
  border-radius: 5px;
  border: ${(props) => props.border || "1px solid #e1e1e1"};
  outline: none;
  font-size: 12px;
  box-shadow: ${(props) => props.shadow && "0 0 5px #e1e1e1"};
`;

export const Label = styled.label`
  font-size: 12px;
  color: #505050;
`;

export const ErrorMessage = styled.p`
  text-align: left;
  color: #dc3545;
  font-size: 12px;
`;

export const AlignedContentStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: ${(props) => props.justify || "flex-start"};
  align-items: ${(props) => props.align || "center"};
  gap: ${(props) => props.gap || "10px"};

  @media (max-width: ${(props) => props.break}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const RequiredAsterisk = styled.span`
  color: #dc3545;
`;

export const ContainerEye = styled.div`
  position: absolute;
  right: 15px;
  bottom: ${(props) => (props.errorMessage ? "15px" : "0")};
  cursor: pointer;
`;

export const Search = styled.span`
  position: absolute;
  top: 9px;
  right: 8px;
`;

export const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "100%",
    height: "23px",
    backgroundColor: "#fff",
    border: "1px solid #e1e1e1",
    outline: "none",
    fontSize: "12px",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "#505050",
    outline: "none",
  }),
  option: (provided, state) => ({
    ...provided,
    display: "flex",
    flexDirection: "column",
    fontSize: "12px",
    background: state.data?.color || "#fff",
    color: "#000",
  }),
  menu: (base) => ({ ...base, zIndex: 999999999 }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#fff",
    border: "1px solid #e1e1e1",
    borderRadius: "3px",
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "#ff5757",
    ":hover": {
      backgroundColor: "#ff5757",
      color: "white",
      cursor: "pointer",
    },
  }),
};

export const ButtonAddFile = styled.button`
  background-color: #ff6961;
  width: fit-content;
  padding: 5px 15px;
  border-radius: 5px;
  border: none;
  outline: none;
  display: flex;
  gap: 10px;
  color: #8463a9;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const ContainerUpFiled = styled.div`
  background-color: #fff;
  width: ${(props) => props.width || "80%"};
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.justifyContent || "space-between"};
  padding: ${(props) => props.padding};
  gap: ${(props) => props.gap};
  position: relative;
  flex-direction: ${(props) => props.direction || "row"};

  background-color: #f7f7f8;
  border-radius: 6px;

  span {
    position: absolute;
    right: 0;
    margin-top: 4px;
  }
`;

export const NameFile = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #0008;
  width: fit-content;
`;

export const ContainerPreview = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 5px;
  border-radius: 8px;
  border: 1px solid #e1e1e1;
  position: relative;
`;

export const ContainerAddImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const Preview = styled.img`
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 8px;
`;

export const ContainerTrash = styled.div`
  background-color: #ff5757;
  position: absolute;
  bottom: 10px;
  left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px;
  border-radius: 50%;
  cursor: pointer;
`;

export const ContainerTextDeleteImage = styled.div`
  background-color: #505050;
  padding: 5px 10px;
  position: absolute;
  border-radius: 5px;
  left: 10px;
  bottom: -20px;
`;
