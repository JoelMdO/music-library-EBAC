import { songs } from "../data/songs";
import Card from "./card";
import type { AlbumBoardProps } from "../types/songs_types";
import useSearchHook from "../hook/search_hook";
import { useState } from "react";
import type { ApiSongs } from "../utils/api_songs";
import { Bug, LoaderCircle } from "lucide-react";
import StyledAlbumRecords from "../styles/StyledAlbumBoard";

const AlbumBoard = ({ artist, setDbUpdated }: AlbumBoardProps) => {
  //
  ///--------------------------------------------------------
  // Modifed to useEffect to retrieve the Songs, previous was
  // with the class ApiSongs.
  //const allSongs = ApiSongs.loadSongs();
  //console.log("artist at AlbumBoard:", artist);

  ///--------------------------------------------------------
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [allSongs, setAllSongs] = useState<
    Record<string, { tracks: ApiSongs["track"][] }>
  >({});
  const [noArtist, setNoArtist] = useState<boolean>(
    !artist || artist.trim() === ""
  );
  //console.log("all songs", allSongs);

  //--------------------------------------------------------
  useSearchHook({
    artist,
    setLoading,
    setError,
    setAllSongs,
    setNoArtist,
    setDbUpdated,
  });
  //--------------------------------------------------------
  //console.log("isloading", isLoading, "error", error, "allSongs", allSongs);

  return (
    <StyledAlbumRecords>
      {noArtist ? (
        <>
          <h1 className="songs-title">Some of my favorite songs:</h1>
          <div className="songs-list">
            {songs.map((song, index) => (
              <Card song={song} index={index} type="joeList" />
            ))}
          </div>
        </>
      ) : isLoading ? (
        <div className="loader">
          <LoaderCircle
            className="loader-icon"
            size={34}
            strokeWidth={2}
            color="var(--guitar-color)"
          />
          <div className="loader-text">
            <p className="loader-text_words">Loading songs</p>
            <p className="loader-text_dots">...</p>
          </div>
        </div>
      ) : error ? (
        <div className="error-container">
          <Bug className="error-icon" size={44} strokeWidth={1} />
          <h1 className="error-title">Ups! Something happened:</h1>
          <p className="error-text">Error: {error}</p>
        </div>
      ) : (
        <div className="songs-list">
          <h2 className="songs-list_title">{artist.toUpperCase()} albums:</h2>
          {Object.keys(allSongs).map(
            (albumName: string, albumIndex: number) => (
              <Card
                key={`${albumName}-${albumIndex}`}
                song={albumName as ApiSongs["strAlbum"]}
                index={albumIndex}
                type="album"
              />
            )
          )}
        </div>
      )}
    </StyledAlbumRecords>
  );
};

export default AlbumBoard;
