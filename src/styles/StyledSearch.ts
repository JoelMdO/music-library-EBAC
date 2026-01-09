import styled from "styled-components";

export const StyledSearch = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2dvh;
  width: 90%;
  height: 50%;
  border-bottom: 2px solid var(--border-color);

  & .search-form {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 1rem;
  }

  & .search-input {
    padding: 0.5rem;
    font-size: 22px;
    border-radius: 4px;
    border: 1px solid var(--search-border-color);
  }

  & .search-form_button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  & .search-songs-button_container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 65%;
    margin-top: 1rem;
    gap: 1rem;
  }

  & .search-all-button {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 0.5rem;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  & .search-all-button {
    z-index: 3;
  }

  & .search-hr {
    height: 16px;
    background-color: var(--border-color);
  }

  & .search-select {
    padding: 1rem;
    border: none;
    border-radius: 1rem;
    background-color: var(--card-song-background-color);
    color: black;
    line-height: 1.5;
    position: relative;
    z-index: 1;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 200px;
  }

  & .search-select:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--select-focus-box-shadow);
    transform: scale(1.02);
    background-color: var(--select-focus-background-color);
  }

  & .search-select:hover {
    background-color: var(--select-focus-background-color);
    transform: translateY(-1px);
  }

  @media (max-width: 1040px) {
    & .search {
      height: 100%;
    }

    & .search-form {
      gap: 0.2rem;
    }

    & .search-songs-button_container {
      display: flex;
      height: auto;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    & .search-hr {
      display: none;
    }

    & .search-select {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 90%;
    }

    & .search-input {
      padding: 0.75rem;
      width: 70%;
      font-size: 16px;
      border-radius: 4px;
      border: 1px solid var(--search-border-color);
      -webkit-appearance: none; /* Better control on iOS */
      appearance: none;
    }

    & .search-all-button {
      margin-top: 1rem;
      pointer-events: auto;
    }
  }
`;
