import { ApiSongs } from "../utils/api_songs";
import "../styles/Main.css";
import CardSong from "./card_song";
import type { SongsBoardProps } from "../types/songs_types";

const SongsBoard = ({ selectedSong, searched, setSaved }: SongsBoardProps) => {
  //
  //console.log("selectedSong", selectedSong);
  //console.log("searched", searched);
  const allSongs = ApiSongs.loadSongs();

  return (
    <section className="songs-section">
      <h1 className="songs-title">
        {searched ? "Selected song:" : "Some of my favorite songs:"}
      </h1>
      <div className="songs-list">
        {searched ? (
          <CardSong
            song={selectedSong!}
            index={0}
            key="selected"
            search={true}
            setSaved={setSaved}
          />
        ) : (
          allSongs.map((song, index) => (
            <CardSong song={song} index={index} key={index} search={searched} />
          ))
        )}
      </div>
    </section>
  );
};

export default SongsBoard;
