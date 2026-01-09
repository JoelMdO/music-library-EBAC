import styled from "styled-components";

const StyledAlbumRecords = styled.section`
  display: flex;
  flex-direction: column;
  width: 80vw;
  height: 100dvh;

& .songs-title {
  font-size: 2.5em;
  padding-left: 5vw;
  padding-bottom: 3dvh;
  font-style: italic;
  color: var(--search-border-color);
}

& .songs-list {
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(200px, 300px));
  gap: 1rem;
}

& .loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50dvh;
  gap: 0.5rem;
  color: var(--text-color);
}

& .loader-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

& .loader-text {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.2rem;
}

& .loader-text_words {
  margin: 0;
  padding: 0;
  font-size: clamp(0.8rem, 2vw, 1.5rem);
}

& .loader-text_dots {
  font-size: clamp(0.8rem, 2vw, 1.5rem);
  animation: blink 3s steps(3, start) infinite;
}

@keyframes blink {
  0%,
  20% {
    opacity: 0;
  }
  21%,
  40% {
    opacity: 1;
  }
  41%,
  60% {
    opacity: 0;
  }
  61%,
  80% {
    opacity: 1;
  }
  81%,
  100% {
    opacity: 0;
  }
}

& .error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50dvh;
  gap: 1rem;
}

& .error-icon {
  color: var(--error-color);
}

& .error-title {
  margin: 0;
  padding: 0;
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  color: var(--error-title-color);
}

& .error-text {
  margin: 0;
  padding: 0;
  font-size: clamp(1rem, 2vw, 1.5rem);
  color: var(--white);
}

@media (max-width: 768px) {
  & .main {
    flex-direction: column;
  }

  & .aside {
    flex-direction: row;
    width: 100vw;
    height: 20dvh;
    border-bottom: 2px solid var(--border-color);
  }

  & .songs-section {
    padding: 5dvh 0;
    width: 100vw;
    height: 80dvh;
  }

  & .songs-title {
    font-size: 1.5em;
    padding-left: 5vw;
    padding-bottom: 3dvh;
    color: var(--guitar-color);
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  & .aside {
    width: 40vw;
  }

  & .songs-section {
    padding: 5dvh 0;
    width: 60vw;
    height: 100dvh;
  }

  & .songs-title {
    font-size: 1.7em;
    color: var(--search-border-color);
  }
`;

export default StyledAlbumRecords;
