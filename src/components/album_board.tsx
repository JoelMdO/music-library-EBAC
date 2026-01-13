import { songs } from "../data/songs";
import Card from "./card";
import type { ApiSongs } from "../utils/api_songs";
import { Bug, LoaderCircle } from "lucide-react";
import StyledAlbumRecords from "../styles/StyledAlbumBoard";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const AlbumBoard = () => {
  //
  ///--------------------------------------------------------
  // Modifed to Redux, previous was
  // with the class ApiSongs.
  ///--------------------------------------------------------
  const isLoading = useSelector((state: RootState) => state.search.loading);
  const allSongs = useSelector((state: RootState) => state.search.results);
  console.log("allsongs", allSongs);

  const error = useSelector((state: RootState) => state.search.error);
  const noArtist = useSelector(
    (state: RootState) => state.search.artist.trim() === ""
  );
  const artist = useSelector((state: RootState) => state.search.artist);

  return (
    <StyledAlbumRecords>
      {noArtist ? (
        <>
          <h1 className="songs-title">Some of my favorite songs:</h1>
          <div className="songs-list">
            {songs.map((song, index) => (
              <Card
                song={song}
                index={index}
                type="joeList"
                key={`joeList-${index}`}
              />
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
            (albumItem: string, albumIndex: number) => (
              <Card
                key={`${albumItem}-${albumIndex}`}
                song={albumItem as ApiSongs["strAlbum"]}
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
