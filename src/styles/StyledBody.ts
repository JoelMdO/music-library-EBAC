import styled from "styled-components";

export const StyledMain = styled.main`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100dvh;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100vw;
    height: 80dvh;
  }
`;

export const StyledAside = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 45vw;
  height: 100dvh;
  border-right: 2px solid var(--border-color);
  position: relative;

  @media (max-width: 768px) {
    width: 100vw;
    height: 40dvh;
    padding-bottom: 1rem;
  }
`;
