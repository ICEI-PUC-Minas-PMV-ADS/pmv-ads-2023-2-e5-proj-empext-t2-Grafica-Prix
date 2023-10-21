import styled from "styled-components";

export const ContainerCarousel = styled.div`
  width: 100%;
  height: 235px;
  display: flex;
  position: relative;
`;

export const ContainerCarouselProducts = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;
  overflow: hidden;
  scroll-behavior: smooth;
  margin: 0 auto;
  white-space: nowrap;
`;

export const ContainerArrows = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-between;
  top: 50%;
  left: -10px;
  transform: translateY(-50%);
`;

export const ArrowButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
`;
