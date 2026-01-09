import type { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    fontFamily: string;
    lineHeight: string;
    fontWeight: string;
    colorScheme: string;
    color: string;
    backgroundColor: string;
    guitarColor: string;
    headerToColor: string;
    headerFromColor: string;
    cardSongBackgroundColor: string;
    cardAlbumBackgroundColor: string;
    cardJoeBackgroundColor: string;
    songsListTitle: string;
    borderColor: string;
    searchBorderColor: string;
    boxShadowCardSong: string;
    addIconColor: string;
    savedIconColor: string;
    imgCardShadow: string;
    errorColor: string;
    errorTitleColor: string;
    selectFocusBoxShadow: string;
    selectFocusBackgroundColor: string;
    songDetailMenuBorderColor: string;
    songDetailMenuWhiteColor: string;
    songDetailMenuButtonHoverColor: string;
  }
}

export const theme: DefaultTheme = {
  fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
  lineHeight: "1.5",
  fontWeight: "400",
  colorScheme: "light dark",
  color: "rgba(255, 255, 255, 0.87)",
  backgroundColor: "#000000ff",
  guitarColor: "#dbe522ff",
  headerToColor: "#1db954",
  headerFromColor: "#191414",
  cardSongBackgroundColor: "#5ac995ff",
  cardAlbumBackgroundColor: "#5abcc9ff",
  cardJoeBackgroundColor: "#eaf0f1ff",
  songsListTitle: "#77998fff",
  borderColor: "rgba(255, 255, 255, 0.1)",
  searchBorderColor: "#ccc",
  boxShadowCardSong: "rgba(0, 0, 0, 0.1)",
  addIconColor: "#1db954",
  savedIconColor: "#e5aa22ff",
  imgCardShadow: "rgba(0, 0, 0, 0.4)",
  errorColor: "#ff4c4cff",
  errorTitleColor: "#e8be34ff",
  selectFocusBoxShadow: "rgba(0, 123, 255, 0.25)",
  selectFocusBackgroundColor: "rgba(255, 255, 255, 0.95)",
  songDetailMenuBorderColor: "#333",
  songDetailMenuWhiteColor: "#fff",
  songDetailMenuButtonHoverColor: "#1ed760",
};
