import styled from "styled-components";

export const DivisorStyles = styled.div`
  background-color: ${(props) => props.bgColor};
  flex: ${(props) => props.flex};
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height};
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  gap: ${(props) => props.gap || "10px"};
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  margin: ${(props) => props.margin};
  box-shadow: ${(props) => props.boxShadow && "0 0 5px #e1e1e1"};
  padding: ${(props) => props.padding};
  overflow: ${(props) => props.overflow};
  border: ${(props) => props.border};
  border-bottom: ${(props) => props.borderBottom && "1px solid #e1e1e1"};
  align-items: ${(props) => props.alignItems};
  position: relative;

  @media (max-width: ${(props) => props.breakPoint}) {
    flex-direction: column;
  }
`;
