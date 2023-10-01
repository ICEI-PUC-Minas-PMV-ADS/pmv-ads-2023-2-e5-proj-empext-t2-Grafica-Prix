import styled from "styled-components";

export const SectionStyles = styled.div`
  width: ${(props) => props.width || "100%"};
  padding: ${(props) => props.padding || "20px"};
  flex: ${(props) => props.flex || "1"};
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  gap: ${(props) => props.gap || "10px"};
  align-items: ${(props) => props.alignItems || "flex-start"};
  justify-content: ${(props) => props.justifyContent || "flex-start"};
`;
