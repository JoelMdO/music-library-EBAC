import SearchResults from "./search_results";
import "../styles/Body.css";
import AlbumBoard from "./album_board";
import { useState } from "react";
import type { SearchResultTypes } from "../types/songs_types";

const Body = () => {
  //
  const [selectedSong, setSelectedSong] = useState<
    [artist: string, searched: boolean]
  >(["", false]);
  const [dbUpdated, setDbUpdated] = useState<boolean>(false);
  //
  //
  return (
    <main className="main">
      <aside className="aside">
        <SearchResults
          searched={selectedSong[1]}
          setSelectedSong={({ artist, searched }: SearchResultTypes) =>
            setSelectedSong([artist, searched])
          }
          artist={selectedSong[0]}
          dbUpdated={dbUpdated}
        />
        {/* <Library canciones={savedSongs} /> */}
      </aside>
      <AlbumBoard setDbUpdated={setDbUpdated} artist={selectedSong[0]} />
    </main>
  );
};

export default Body;
