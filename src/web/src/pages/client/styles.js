import styled from "styled-components";

export const Content = styled.div`
  flex: 1;
  background-color: #fbfbfb;
  position: relative;
  top: 100px;
  overflow-y: auto;

  @media (max-width: 800px) {
    top: 127px;
  }
`;
