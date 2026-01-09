import styled from "styled-components";

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 15dvh;
  gap: 1rem;
  background-image: linear-gradient(
    90deg,
    var(--header-to-color),
    var(--header-from-color)
  );
}

.header-guitar-icon {
  margin-left: 40px;
}

.header-title {
  color: white;
  font-size: 3rem;
  font-weight: bold;
  margin-left: 40px;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    height: 20dvh;
  }

  .header-guitar-icon {
    margin-left: 0;
  }

  .header-title {
    font-size: 2.2rem;
    margin-left: 0;
  }
}
`;
