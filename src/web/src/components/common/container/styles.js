import styled from "styled-components";

export const ContainerStyles = styled.div`
  max-width: ${(props) => props.maxWidth || "1200px"};
  padding: ${(props) => props.padding || "20px"};
  margin: ${(props) => props.margin || "0 auto"};
  display: flex;
  flex-direction: ${(props) => props.direction || "column"};
  justify-content: ${(props) => props.justifyContent || "flex-start"};
  align-items: ${(props) => props.alignItems || "flex-start"};
  height: ${(props) => props.height};
  gap: ${(props) => props.gap || "10px"};
  position: relative;
`;
