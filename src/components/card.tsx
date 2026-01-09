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
import {
  StyledCardAlbum,
  StyledCardSong,
  StyledJoeCardSong,
} from "../styles/StyledCard";

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
        <StyledCardAlbum key={index}>
          <Disc3 className="card-album_disc" size={64} strokeWidth={3} />
          <h2 className="card-album_title">{song as string}</h2>
          <div className="card-album_info">
            <div className="card-album_duration">
              <button type="button" className="card-album_button">
                <AudioLines size={24} strokeWidth={3} />
                <p>Songs</p>
              </button>
            </div>
          </div>
        </StyledCardAlbum>
      ) : type === "joeList" ? (
        <StyledJoeCardSong key={index}>
          <img
            className="joe-card-song_img"
            src={(song as Partial<ApiSongs>).photo}
            alt={(song as Partial<ApiSongs>).title}
          />
          <h2 className="joe-card-song_title">
            {(song as Partial<ApiSongs>).title}
          </h2>
          <div className="joe-card-song_info">
            <div className="joe-card-song_artist">
              <MicVocal size={16} strokeWidth={3} />
              <p>{(song as Partial<ApiSongs>).artist}</p>
              <div className="joe-card-song_duration">
                <Timer size={16} strokeWidth={3} />
                <p>{(song as Partial<ApiSongs>).duration}</p>
              </div>
            </div>
          </div>
        </StyledJoeCardSong>
      ) : (
        <StyledCardSong key={index}>
          <Headphones
            className="card-song_headphones"
            size={64}
            strokeWidth={2}
          />
          <h2 className="card-song_title">
            {(song as Partial<ApiSongs>).strTrack}
          </h2>
          <div className="card-song_info">
            <div className="card-song_artist">
              <div className="card-song_duration">
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
              <div className="card-song_likes">
                <ThumbsUp size={16} strokeWidth={3} />
                {(song as ApiSongs["track"]).intMusicVidLikes != null ? (
                  <>
                    <p>{(song as ApiSongs["track"]).intMusicVidLikes}</p>
                  </>
                ) : (
                  <p>No disp.</p>
                )}
              </div>
              <div className="card-song_plays">
                <Play size={16} strokeWidth={3} />
                {(song as ApiSongs["track"]).intTotalPlays != null ? (
                  <p>{(song as ApiSongs["track"]).intTotalPlays}</p>
                ) : (
                  <p>No disp.</p>
                )}
              </div>
            </div>
            <div className="card-song_description">
              <Music2 size={16} strokeWidth={3} />
              {(song as ApiSongs["track"]).strDescriptionEN != null ? (
                <p>{(song as ApiSongs["track"]).strDescriptionEN}</p>
              ) : (
                <p>Descripción de la canción no disponible en la API.</p>
              )}
            </div>
          </div>
        </StyledCardSong>
      )}
    </>
  );
};

export default Card;
