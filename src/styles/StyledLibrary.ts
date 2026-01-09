import styled from "styled-components";

export const StyledLibrary = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  & .library-divider {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  & .library-title {
    margin-left: 10dvh;
    font-size: 2rem;
  }

  & .library-text {
    font-size: 1rem;
  }

  & .library-song {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 90%;
    padding: 0.5rem;
    gap: 1rem;
    border-bottom: 1px solid var(--border-color);
    overflow-y: auto;
  }

  & .library-song_img {
    width: 50px;
    height: 50px;
    border-radius: 10%;
    box-shadow: 10px 4px 8px var(--img-card-shadow);
  }

  & .library-song_info {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
  }

  & .library-song_title,
  & .library-song_artist {
    margin: 0;
    padding: 0;
  }

  & .library-song_title {
    font-size: 1.2rem;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    & .library-title {
      text-align: center;
      margin-left: 2dvh;
      font-size: 1.2rem;
    }
    & .library-text {
      font-size: 0.7rem;
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    & .library-title {
      margin-left: 5dvh;
      font-size: 1.5rem;
    }

    & .library-text {
      font-size: 1rem;
    }
  }
`;
