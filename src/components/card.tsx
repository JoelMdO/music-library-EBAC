import "../styles/Card.css";
import {
  AudioLines,
  Disc3,
  Headphones,
  MicVocal,
  Music2,
  Play,
  ThumbsUp,
  Timer,
} from "lucide-react";
import { ApiSongs } from "../utils/api_songs";

const Card = ({
  song,
  index,
  type,
}: {
  song: ApiSongs["strAlbum"] | Partial<ApiSongs> | undefined;
  index: number;
  search?: boolean;
  setSaved?: (saved: string) => void;
  type: "album" | "track" | "joeList";
}) => {
  //
  //console.log("song at card", song);

  return (
    <>
      {type === "album" ? (
        <div className="card-album" key={index}>
          <Disc3 className="disc-card_album" size={64} strokeWidth={3} />
          <h2 className="title-card_album">{song as string}</h2>
          <div className="info-card_album">
            <div className="duration-card_album">
              <button type="button" className="button-card_album">
                <AudioLines size={24} strokeWidth={3} />
                <p>Songs</p>
              </button>
            </div>
          </div>
        </div>
      ) : type === "joeList" ? (
        <div className="joe-card-song" key={index}>
          <img
            className="joe-img-card_song"
            src={(song as Partial<ApiSongs>).photo}
            alt={(song as Partial<ApiSongs>).title}
          />
          <h2 className="joe-title-card_song">
            {(song as Partial<ApiSongs>).title}
          </h2>
          <div className="joe-info-card_song">
            <div className="joe-artist-card_song">
              <MicVocal size={16} strokeWidth={3} />
              <p>{(song as Partial<ApiSongs>).artist}</p>
              <div className="joe-duration-card_song">
                <Timer size={16} strokeWidth={3} />
                <p>{(song as Partial<ApiSongs>).duration}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card-song" key={index}>
          <Headphones
            className="headphones-card_song"
            size={64}
            strokeWidth={2}
          />
          <h2 className="title-card_song">
            {(song as Partial<ApiSongs>).strTrack}
          </h2>
          <div className="info-card_song">
            <div className="artist-card_song">
              <div className="duration-card_song">
                <Timer size={16} strokeWidth={3} />
                {(song as Partial<ApiSongs>).intDuration != null ? (
                  <p>
                    {ApiSongs.convertDuration(
                      (song as Partial<ApiSongs>).intDuration!
                    )}
                  </p>
                ) : (
                  <p>No disp.</p>
                )}
              </div>
              <div className="album-card_likes">
                <ThumbsUp size={16} strokeWidth={3} />
                {(song as ApiSongs["track"]).intMusicVidLikes != null ? (
                  <>
                    <p>{(song as ApiSongs["track"]).intMusicVidLikes}</p>
                  </>
                ) : (
                  <p>No disp.</p>
                )}
              </div>
              <div className="album-card_plays">
                <Play size={16} strokeWidth={3} />
                {(song as ApiSongs["track"]).intTotalPlays != null ? (
                  <p>{(song as ApiSongs["track"]).intTotalPlays}</p>
                ) : (
                  <p>No disp.</p>
                )}
              </div>
            </div>
            <div className="album-card_description">
              <Music2 size={16} strokeWidth={3} />
              {(song as ApiSongs["track"]).strDescriptionEN != null ? (
                <p>{(song as ApiSongs["track"]).strDescriptionEN}</p>
              ) : (
                <p>Descripción de la canción no disponible en la API.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
