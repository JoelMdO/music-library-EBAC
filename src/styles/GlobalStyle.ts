import { createGlobalStyle, type DefaultTheme } from "styled-components";

export const GlobalStyle = createGlobalStyle<{ theme: DefaultTheme }>` 

:root {
  font-family: ${({ theme }) => theme.fontFamily};
  line-height: ${({ theme }) => theme.lineHeight};
  font-weight: ${({ theme }) => theme.fontWeight};

  color-scheme: ${({ theme }) => theme.colorScheme};
  color: ${({ theme }) => theme.color};
  background-color: ${({ theme }) => theme.backgroundColor};

  --guitar-color: ${({ theme }) => theme.guitarColor};
  --header-to-color: ${({ theme }) => theme.headerToColor};
  --header-from-color: ${({ theme }) => theme.headerFromColor};
  --card-song-background-color: ${({ theme }) => theme.cardSongBackgroundColor};
  --card-album-background-color: ${({ theme }) =>
    theme.cardAlbumBackgroundColor};
  --card-joe-background-color: ${({ theme }) => theme.cardJoeBackgroundColor};
  --songs-list-title: ${({ theme }) => theme.songsListTitle};
  --border-color: ${({ theme }) => theme.borderColor};
  --search-border-color: ${({ theme }) => theme.searchBorderColor};
  --box-shadow-card-song: ${({ theme }) => theme.boxShadowCardSong};
  --add-icon-color: ${({ theme }) => theme.addIconColor};
  --saved-icon-color: ${({ theme }) => theme.savedIconColor};
  --img-card-shadow: ${({ theme }) => theme.imgCardShadow};
  --error-color: ${({ theme }) => theme.errorColor};
  --error-title-color: ${({ theme }) => theme.errorTitleColor};
  --select-focus-box-shadow: ${({ theme }) => theme.selectFocusBoxShadow};
  --select-focus-background-color: ${({ theme }) =>
    theme.selectFocusBackgroundColor};
  --song-detail-menu-border-color: ${({ theme }) =>
    theme.songDetailMenuBorderColor};
  --song-detail-menu-white-color: ${({ theme }) =>
    theme.songDetailMenuWhiteColor};
  --song-detail-menu-button-hover-color: ${({ theme }) =>
    theme.songDetailMenuButtonHoverColor};
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}
`;
