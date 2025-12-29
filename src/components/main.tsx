import Songs from "../data/songs";
import SearchResults from "./search_results";
import Library from "./library";
import SongsBoard from "./song_board";
import "../styles/Main.css";
import type { SongsTypes } from "../types/songs_types";
import { useState } from "react";
import { ApiSongs } from "../utils/api_songs";

const Main = () => {
  //
  const [selectedSong, setSelectedSong] = useState<
    [SongsTypes | null, boolean]
  >([null, false]);
  //
  let savedSongs: ApiSongs[] = [];
  //
  const [saved, setSaved] = useState<string>("");
  //
  if (saved !== "") {
    savedSongs = ApiSongs.getSavedSongs(Songs);
    setSaved("");
  }
  //
  return (
    <main className="main">
      <aside className="aside">
        <SearchResults
          canciones={Songs}
          setSelectedSong={(song: SongsTypes, searched: boolean) =>
            setSelectedSong([song, searched])
          }
        />
        <Library canciones={savedSongs} />
      </aside>
      <SongsBoard
        selectedSong={selectedSong[0]}
        searched={selectedSong[1]}
        setSaved={setSaved}
        saved={saved}
      />
    </main>
  );
};

export default Main;
