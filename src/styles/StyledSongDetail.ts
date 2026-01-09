import styled from "styled-components";

export const StyledSongDetail = styled.section`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100dvh;

  & .song-detail_menu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid var(--song-detail-menu-border-color);
    background-image: linear-gradient(
      to right,
      var(--card-album-background-color),
      var(--search-border-color)
    );
  }

  & .song-detail_menu-title {
    color: var(--song-detail-menu-white-color);
    font-size: 24px;
    margin: 0;
  }

  & .songs-title {
    color: var(--songs-list-title-color);
    font-size: 32px;
    margin: 0;
  }

  & .song-detail_menu-button {
    display: flex;
    align-items: end;
    background-color: var(--header-to-color);
    border: none;
    margin-top: 20px;
    color: var(--song-detail-menu-white-color);
    width: 110px;
    height: 20px;
    padding: 5px;
    font-size: 12px;
    border-radius: 20px;
    cursor: pointer;

    &:hover {
      background-color: var(--song-detail-menu-button-hover-color);
    }
  }

  & .song-detail_info {
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
  }

  & h3 {
    padding-bottom: 0;
    margin-bottom: 0;
  }

  & .song-detail_info-album-addSong-button_container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2px;
  }

  & .song-detail_info-album-addSong-button {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    background-color: var(--guitar-color);
    border: none;
    color: var(--header-from-color);
    width: 60px;
    height: 50px;
    padding: 5px;
    font-size: 14px;
    border-radius: 20px;
    cursor: pointer;

    &:hover {
      background-color: var(--card-album-background-color);
    }

    &:disabled {
      background-color: var(--songs-list-title);
      pointer-events: none;
    }
  }

  & .song-detail_info-album-addSong-button_icon {
    display: flex;
    color: var(--header-from-color);
  }

  & . song-detail_info-album-addSong-button_icon-check {
    display: flex;
    color: var(--header-to-color);
  }

  & .song-detail_info-album-addSong-button_text {
    font-size: 10px;
  }
`;
