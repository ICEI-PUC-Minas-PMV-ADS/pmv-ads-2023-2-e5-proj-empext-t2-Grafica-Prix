import styled from "styled-components";

export const CardStyles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;

  min-width: 180px;
  max-width: 180px;

  color: white;

  cursor: pointer;

  position: relative;
`;

export const ImageProduct = styled.img`
  background-color: #e1e1e1;
  width: 100%;
  height: 180px;
  border-radius: 5px;
  margin-bottom: 5px;
  border: 1px solid #e1e1e1;
`;

export const PromotionAlert = styled.div`
  position: ${(props) => (props.relative ? "relative" : "absolute")};
  background-color: #67b79e;
  padding: 3px 5px;
  border-radius: 3px;
  right: 0;
  height: fit-content;
`;


