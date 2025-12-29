import { SearchIcon } from "lucide-react";
import type { SongsTypes } from "../types/songs_types";
import "../styles/Search.css";
import "../styles/Main.css";

const SearchResults = ({
  canciones,
  setSelectedSong,
}: {
  canciones: SongsTypes[];
  setSelectedSong: (song: SongsTypes, searched: boolean) => void;
}) => {
  return (
    <div className="search">
      <h3 className="search-title">Search your favorite:</h3>
      <div className="search-form">
        <SearchIcon
          className="search-form_icon"
          size={20}
          strokeWidth={3}
          color="var(--guitar-color)"
        />

        <select
          className="search-select"
          title="Select a song"
          onChange={(e) => {
            const selectedIndex = e.target.selectedIndex - 2;
            if (selectedIndex >= 0) {
              setSelectedSong(canciones[selectedIndex], true);
            } else if (e.target.value === "all") {
              setSelectedSong({ title: "all" } as SongsTypes, false);
            }
          }}
        >
          <option className="search-option" value="">
            Song...
          </option>
          <option className="search-option" value="all">
            All
          </option>
          {canciones.map((song, index) => (
            <option className="search-option" key={index} value={song.title}>
              {song.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SearchResults;
