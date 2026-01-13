import type { ApiSongs } from "../utils/api_songs";

export interface SongsTypes {
  title: string;
  artist: string;
  duration?: string;
  photo?: string;
  saved?: boolean;
  index?: number;
  album?: string;
}

export interface SearchResultTypes {
  artist: string;
  searched: boolean;
}

export interface SongsBoardProps {
  searched: boolean;
  setSaved: (saved: string) => void;
  saved: string;
}

export interface AlbumBoardProps {
  artist: string;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  setError?: React.Dispatch<React.SetStateAction<string | null>>;
  setAllSongs?: React.Dispatch<React.SetStateAction<Partial<ApiSongs>[]>>;
  setDbUpdated?: React.Dispatch<React.SetStateAction<boolean>>;
}

// API Response Types
export interface ApiAlbumResponse {
  album: ApiSongs["album"];
}

export interface ApiTrackResponse {
  track: ApiSongs["track"];
}

export interface ApiResponseError {
  error: string;
}

export interface ApiResponseWrapper<T> {
  status: number;
  message: T;
}
export interface AllSongsMap {
  [albumName: string]: {
    tracks: ApiSongs["track"][];
  };
}

export interface StoreSongsTypes {
  library: {
    songs: SongsTypes[];
  };
}

export type ApiError = {
  message: string;
  status?: number;
};

export interface SearchState {
  results: AllSongsMap;
  loading: boolean;
  error: string | null;
  artist: string;
  filterSongs: AllSongsMap;
}
