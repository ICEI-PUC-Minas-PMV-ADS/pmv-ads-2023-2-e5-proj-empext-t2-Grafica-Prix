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
`;

export const InputGroup = styled.div`
  display: ${(props) => props.display || "block"};
  justify-content: ${(props) => props.justify || "unset"};
  gap: ${(props) => props.gap || "5px"};
  position: relative;
  width: ${(props) => (props.width === "fit" ? "fit-content" : "100%")};
  align-items: ${(props) => props.align || "unset"};

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
  padding: ${(props) => (props.search ? "10px 10px 10px 40px" : "10px 10px")};
  border-radius: 5px;
  border: 1px solid #e1e1e1;
  outline: none;
  font-size: 12px;
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
  bottom: ${(props) => (props.errorMessage ? "15px" : "3px")};
  cursor: pointer;
`;
