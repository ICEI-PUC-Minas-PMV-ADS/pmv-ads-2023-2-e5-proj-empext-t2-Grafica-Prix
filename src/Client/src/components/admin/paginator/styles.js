import styled from "styled-components";

export const ContainerPaginator = styled.div`
  background-color: #fff;
  border-top: 1px solid #e1e1e1;
  width: 100%;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  border-bottom-left-radius: ${(props) => props.radius || "5px"};
  border-bottom-right-radius: ${(props) => props.radius || "5px"};
`;

export const PageButton = styled.button`
  background-color: #fff;
  padding: 5px 15px;
  outline: none;
  border-radius: 5px;
  border: 1px solid #e1e1e1;
  color: #505050;
  cursor: ${(props) => {
    if (props.disabled) return " initial";
    else return "pointer";
  }};
  opacity: ${(props) => props.disabled && "0.6"};

  :hover {
    opacity: 0.6;
  }

  font-size: 12px;
`;

export const TextPaginator = styled.p`
  font-size: 12px;
`;
