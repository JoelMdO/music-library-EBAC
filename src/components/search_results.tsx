import { LibraryBig, SearchIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { StyledSearch } from "../styles/StyledSearch";
import { useAppDispatch } from "../redux/hook/hook";
import { fetchSongs } from "../redux/thunks/fetchSongThunk";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import {
  resetResults,
  artist,
  filterResults,
} from "../redux/slices/searchSlice";

const SearchResults = () => {
  //
  const searchedArtist = useSelector((state: RootState) => state.search.artist);
  const albumsIds = useSelector((state: RootState) => state.search.results);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  //
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget.elements.namedItem(
      "searchInput"
    ) as HTMLInputElement;
    const query = target.value;

    if (query !== "") {
      dispatch(fetchSongs(query.trim()));
      dispatch(artist(query.trim()));
      target.value = "";
    }
  };
  //
  return (
    <StyledSearch>
      <h3 className="search-title">Search your favorite:</h3>
      <form className="search-form" onSubmit={handleSubmit}>
        <button type="submit" className="search-form_button" title="submit">
          <SearchIcon
            className="search-form_icon"
            size={20}
            strokeWidth={3}
            color="var(--guitar-color)"
          />
        </button>
        <input
          type="text"
          className="search-input"
          placeholder={`${searchedArtist ? `${searchedArtist}` : " Artist..."}`}
          name="searchInput"
        />
      </form>
      {searchedArtist && (
        <div className="search-songs-button_container">
          <select
            className="search-select"
            title="Select a song"
            onChange={(e) => {
              const selectedValue = (e.target as HTMLSelectElement).value;
              const parsedValue = JSON.parse(selectedValue);
              navigate(`/song/${encodeURIComponent(parsedValue.track)}`);
              dispatch(filterResults(parsedValue.track));
            }}
          >
            <option className="search-option" value="">
              {`List of songs by ${searchedArtist}`}
            </option>
            <hr />
            {Object.keys(albumsIds).map((albumName: string) =>
              albumsIds[albumName].tracks?.map((track, trackIndex) => (
                <option
                  className="search-option"
                  key={trackIndex}
                  value={JSON.stringify({
                    album: albumName,
                    track: track.strTrack,
                  })}
                >
                  Album: {albumName}, Track: {String(track.strTrack)}
                </option>
              ))
            )}
          </select>
          <hr className="search-hr" />
          <button
            type="button"
            className="search-all-button"
            onClick={() => {
              dispatch(resetResults());
            }}
          >
            <LibraryBig
              className="search-all-icon"
              size={20}
              strokeWidth={3}
              color="var(--guitar-color)"
            />
            Back to Joe's fav's songs
          </button>
        </div>
      )}
    </StyledSearch>
  );
};

export default SearchResults;
