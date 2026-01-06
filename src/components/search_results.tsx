import { LibraryBig, SearchIcon } from "lucide-react";
import "../styles/Search.css";
import type { SearchResultTypes } from "../types/songs_types";
import { useNavigate } from "react-router";
import type { ApiSongs } from "../utils/api_songs";

const SearchResults = ({
  searched,
  setSelectedSong,
  artist,
  dbUpdated,
}: {
  searched: boolean;
  setSelectedSong: ({ artist, searched }: SearchResultTypes) => void;
  artist: string;
  dbUpdated: boolean;
}) => {
  //
  let albumsIds: Record<string, { tracks: ApiSongs["track"][] }> = {};

  if (searched && dbUpdated) {
    console.log("searched", searched, "dbUpdated", dbUpdated);
    albumsIds = JSON.parse(localStorage.getItem("albums") || "{}");
  }
  const navigate = useNavigate();
  //
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget.elements.namedItem(
      "searchInput"
    ) as HTMLInputElement;
    const query = target.value;
    //console.log("query", query);

    if (query !== "") {
      setSelectedSong({
        artist: query,
        searched: true,
      });
      target.value = "";
    }
  };
  //
  return (
    <div className="search">
      <h3 className="search-title">Search your favorite:</h3>
      <form className="search-form_input" onSubmit={handleSubmit}>
        <button type="submit" className="search-form_button">
          <SearchIcon
            className="search-form_icon"
            size={20}
            strokeWidth={3}
            color="var(--guitar-color)"
          />
        </button>
        <input
          type="text"
          className="input-search"
          placeholder={`${searched ? `${artist}` : " Artist..."}`}
          name="searchInput"
        />
      </form>
      {searched && (
        <div className="search-songs-button_container">
          <select
            className="search-select"
            title="Select a song"
            onChange={(e) => {
              const selectedValue = (e.target as HTMLSelectElement).value;
              console.log("selectedValue", selectedValue);
              const parsedValue = JSON.parse(selectedValue);
              navigate(
                `/song/${encodeURIComponent(
                  parsedValue.album
                )}/${encodeURIComponent(parsedValue.track)}`
              );
            }}
          >
            <option className="search-option" value="">
              {`${artist} songs by`}
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
            className="all-button"
            onClick={() => {
              setSelectedSong({ artist: "", searched: false });
              console.log("clicked");
            }}
          >
            <LibraryBig
              className="all-icon"
              size={20}
              strokeWidth={3}
              color="var(--guitar-color)"
            />
            Back to Joe's fav's songs
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
