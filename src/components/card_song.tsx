import "../styles/Card.css";
import { CircleCheckBig, CirclePlus, MicVocal, Timer } from "lucide-react";
import type { SongsTypes } from "../types/songs_types";
import { useState } from "react";
import { ApiSongs } from "../utils/api_songs";

const CardSong = ({
  song,
  index,
  search,
  setSaved,
}: {
  song: SongsTypes;
  index: number;
  search?: boolean;
  setSaved?: (saved: string) => void;
}) => {
  //
  const [searched] = useState<boolean>(search === undefined ? false : search);
  const [isSaved, setIsSaved] = useState<boolean>(
    ApiSongs.isSongSaved(song.title)
  );

  return (
    <>
      <div className="card-song" key={index}>
        <img className="img-card_song" src={song.photo} alt={song.title} />
        <h2 className="title-card_song">{song.title}</h2>
        <div className="info-card_song">
          <div className="artist-card_song">
            <MicVocal size={16} strokeWidth={3} />
            <p>{song.artist}</p>
            <div className="duration-card_song">
              <Timer size={16} strokeWidth={3} />
              <p>{song.duration}</p>
            </div>
          </div>
        </div>
        {searched && (
          <button
            type="button"
            className="button-card_song-save"
            onClick={() => (
              ApiSongs.saveSong(song.title),
              setSaved!(song.title),
              setIsSaved(true)
            )}
          >
            {isSaved ? (
              <CircleCheckBig
                size={24}
                strokeWidth={3}
                color="var(--saved-icon-color)"
              />
            ) : (
              <CirclePlus
                size={24}
                strokeWidth={3}
                color="var(--add-icon-color)"
              />
            )}
            {}
          </button>
        )}
      </div>
    </>
  );
};

export default CardSong;
