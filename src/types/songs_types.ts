export interface SongsTypes {
  title: string;
  artist: string;
  duration: string;
  photo: string;
  saved: boolean;
  index?: number;
}

export interface SongsBoardProps {
  selectedSong: SongsTypes | null;
  searched: boolean;
  setSaved: (saved: string) => void;
  saved: string;
}
