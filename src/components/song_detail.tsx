import { useNavigate, useParams } from "react-router";
import { ApiSongs } from "../utils/api_songs";
import "../styles/SongDetail.css";
import { Milestone } from "lucide-react";
import Card from "./card";
const SongDetail = () => {
  //
  const params = useParams();
  //console.log("params", params);
  const decodedTrack = decodeURIComponent(params.id!);
  const decodedAlbum = decodeURIComponent(params.album!);
  //console.log("decodedParams", decodedTrack); // //

  //--------------------------------------------------------
  const raw: ApiSongs["track"] = ApiSongs.getAlbumTracks(
    decodedAlbum || "",
    decodedTrack || ""
  );
  const navigate = useNavigate();
  //console.log("track detail", raw);
  //
  let track: ApiSongs["track"] | undefined;

  if (!raw) {
    track = undefined;
  } else if (Array.isArray(raw)) {
    track = raw.find((t) => t.strTrack === decodedTrack);
  } else if ("tracks" in raw && Array.isArray(raw.tracks)) {
    // if the function returned an album object
    track = raw.tracks.find(
      (t: ApiSongs["track"]) => t.strTrack === decodedTrack
    );
  } else if ("strTrack" in raw) {
    // single track object
    track = raw as ApiSongs["track"];
  }
  //--------------------------------------------------------
  return (
    <section className="song-detail_container">
      <div className="song-detail_menu">
        {track !== undefined ? (
          <div className="song-detail_menu-container">
            <h1 className="song-detail_menu-title">Detalles de la canción</h1>
            <h1 className="songs-title">{track!.strTrack}</h1>
          </div>
        ) : (
          <h1 className="songs-title">No se encontró la canción</h1>
        )}
        <button
          type="button"
          className="song-detail_menu-button"
          onClick={() => navigate("/")}
        >
          <Milestone size={48} strokeWidth={2} />
          Regresar
        </button>
      </div>
      {track !== undefined ? (
        <div className="song-detail_info">
          <div className="song-detail_info-album">
            <h3> Album: {track!.strAlbum}</h3>
            <p> Artist: {track!.strArtist}</p>
          </div>
          <Card song={track} index={0} type="track" />
        </div>
      ) : null}
    </section>
  );
};

export default SongDetail;
