import styled from "styled-components";

export const StyledButton = styled.button`
  min-width: ${(props) => props.minWidth || "100px"};
  width: ${(props) => {
    if (props.delete) return "10px";
    else if (props.width) return props.width;
    else return "100%";
  }};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.padding || "15px"};
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => {
    if (props.delete) return "#EE5656";
    else return "#fff";
  }};
  border: none;
  border-radius: 5px;
  background-color: #ff5757;
  position: relative;
  margin: ${(props) => {
    if (props.margin) return props.margin;
    else if (props.delete) return "20px auto";
    else return 0;
  }};
  cursor: pointer;

  display: ${(props) => (props.centralize ? "flex" : "block")};
  justify-content: center;
  align-items: center;
  gap: 10px;

  :hover {
    background-color: ${(props) => {
      if (props.color === "purple") return "#765998d1";
      else if (props.color === "green") return "#51A8B1d1";
      else if (props.color === "gray") return "#727376F1";
      else if (props.delete) return "20px";
      else return props.hoverColor;
    }};
    cursor: pointer;
  }

  :disabled {
    background-color: ${(props) => {
      if (props.color === "purple") return "#765998d1";
      else if (props.color === "green") return "#51A8B1d1";
      else if (props.color === "gray") return "#727376F1";
      else if (props.delete) return "transparent";
      else return props.hoverColor;
    }};
    cursor: default;
    padding: ${(props) => {
      if (props.loading && props.disabled) {
        return "12px 0 0 30px;";
      }
      if (props.disabled) {
        return "10px";
      }
    }};
  }

  @media (max-width: 500px) {
    width: 100%;
    margin: ${(props) => props.margin || "15px 0"};
  }
`;
