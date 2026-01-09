import { useDispatch, useSelector } from "react-redux";
import { StyledLibrary } from "../styles/StyledLibrary";
import type { StoreSongsTypes } from "../types/songs_types";
import { FileMusic, Trash2 } from "lucide-react";
import { removeSong } from "../redux/libraryReducer";

const Library = () => {
  //
  const dispatch = useDispatch();
  const savedSongs = useSelector(
    (state: StoreSongsTypes) => state.library.songs
  );

  return (
    <StyledLibrary>
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
              <FileMusic className="library-song_img" size={25} />
              <div className="library-song_info">
                <h4 className="library-song_title">{song.title}</h4>
                <p className="library-song_artist">{song.artist}</p>
              </div>
              <button
                type="button"
                className="library-song_trash-button"
                aria-label="borrar cancion del store"
                onClick={() => dispatch(removeSong(index))}
              >
                <Trash2 className="library-song_trash" size={15} />
              </button>
            </div>
          ))}
      </div>
    </StyledLibrary>
  );
};

export default Library;
