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
    color: #615d5dff;
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

  & .song-detail_info-album {
    color: var(--song-detail-menu-white-color);
    font-size: 20px;
    margin: 0 0 10px 0;
  }
`;
