import styled from "styled-components";

export const BannerList = styled.div`
  display: flex;
  overflow-y: auto;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  gap: 10px;
`;

export const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
`;

export const BannerStyles = styled.img`
  background-color: #ccc;
  width: 100%;
  height: 400px;
  border-radius: 5px;
`;

export const ConatinerActionsBanner = styled.div`
  display: flex;
  gap: 10px;
  position: absolute;
  left: 5px;
  top: 5px;
  z-index: 1;
`;

export const ActionBanner = styled.div`
  background-color: #ff5757;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
`;
