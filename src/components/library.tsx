import type { SongsTypes } from "../types/songs_types";
import "../styles/Library.css";
import { useState } from "react";
import { ApiSongs } from "../utils/api_songs";

const Library = ({ canciones }: { canciones: SongsTypes[] }) => {
  //
  const [savedSongs] = useState<SongsTypes[]>(
    ApiSongs.getSavedSongs({ canciones })
  );
  //

  return (
    <div className="library">
      <h3 className="library-title">Library</h3>
      <div className="library-divider">
        <p className="library-text">
          {`${
            savedSongs.length > 0
              ? "Your music collection:"
              : "Your music collection is empty."
          }`}
        </p>
      </div>
      <div className="library-songs">
        {savedSongs.length > 0 &&
          savedSongs.map((song, index) => (
            <div className="library-song" key={index}>
              <img
                className="library-song_img"
                src={song.photo}
                alt={song.title}
              />
              <div className="library-song_info">
                <h4 className="library-song_title">{song.title}</h4>
                <p className="library-song_artist">{song.artist}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Library;
