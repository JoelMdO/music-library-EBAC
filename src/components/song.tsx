import { ApiSongs } from "../utils/api_songs";
import "../styles/Songs.css";
import { useEffect, useState } from "react";

const Song = () => {
  //
  const [allSongs, setAllSongs] = useState<ApiSongs[]>([]);
  useEffect(() => {
    const fetchSongs = async () => {
      const songs = ApiSongs.loadSongs();
      setAllSongs(songs);
    };
    fetchSongs();
  }, []);
  //
  return (
    <>
      <section className="songs-section">
        <h1>Some of my songs</h1>
        <div className="songs-list">
          {allSongs.map((song, index) => (
            <div className="songs-card" key={index}>
              <img className="songs-img" src={song.photo} alt={song.title} />
              <div className="songs-info">
                <h2>Title: {song.title}</h2>
                <p>Artist: {song.artist}</p>
                <p>Duration: {song.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Song;
