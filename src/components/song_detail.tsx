import { useNavigate, useParams } from "react-router";
import { ApiSongs } from "../utils/api_songs";
import { Check, FolderPlus, Milestone } from "lucide-react";
import Card from "./card";
import { StyledSongDetail } from "../styles/StyledSongDetail";
import { addSong } from "../redux/libraryReducer";
import Swal from "sweetalert2";
import { useState } from "react";
import { useDispatch } from "react-redux";
const SongDetail = () => {
  //
  const params = useParams();
  //console.log("params", params);
  const decodedTrack = decodeURIComponent(params.id!);
  const decodedAlbum = decodeURIComponent(params.album!);
  //console.log("decodedParams", decodedTrack);
  const dispatch = useDispatch();

  //--------------------------------------------------------
  const raw: ApiSongs["track"] = ApiSongs.getAlbumTracks(
    decodedAlbum || "",
    decodedTrack || ""
  );
  const navigate = useNavigate();
  //console.log("track detail", raw);
  const [songSaved, setSongSaved] = useState<boolean>(false);
  //--------------------------------------------------------
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
  ///--------------------------------------------------------
  // Alert
  ///--------------------------------------------------------
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    icon: "success",
    title: "Canción agregada a tu biblioteca",
    showConfirmButton: false,
    timer: 1500,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });
  //--------------------------------------------------------
  return (
    <StyledSongDetail>
      {/* HEADER */}
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
          aria-label="regresar a la página principal"
          onClick={() => navigate("/")}
        >
          <Milestone size={48} strokeWidth={2} />
          Regresar
        </button>
      </div>
      {/* SONG CARD INFO */}
      {track !== undefined ? (
        <div className="song-detail_info">
          <h3> Album: {track!.strAlbum}</h3>
          <p> Artist: {track!.strArtist}</p>
          <Card song={track} index={0} type="track" />
          <div className="song-detail_info-album-addSong-button_container">
            <button
              type="button"
              className="song-detail_info-album-addSong-button"
              aria-label="Agregar a la biblioteca"
              title="Agregar a la biblioteca"
              disabled={songSaved}
              onClick={() => {
                dispatch(
                  addSong({
                    title: track!.strTrack,
                    artist: track!.strArtist,
                    duration: track!.intDuration || "Nodisp",
                    photo: track!.strTrackThumb || "Nodisp",
                    saved: true,
                    album: track!.strAlbum,
                  })
                );
                setSongSaved(true);
                Toast.fire({
                  icon: "success",
                  title: "Canción guardada con éxito",
                });
              }}
            >
              {songSaved ? (
                <Check
                  size={32}
                  strokeWidth={2}
                  className="song-detail_info-album-addSong-button_icon-check"
                />
              ) : (
                <FolderPlus
                  size={32}
                  strokeWidth={2}
                  className="song-detail_info-album-addSong-button_icon"
                />
              )}
            </button>
            <p className="song-detail_info-album-addSong-button_text">
              {songSaved ? "Canción Guardada" : "Guardar en Biblioteca"}
            </p>
          </div>
        </div>
      ) : null}
    </StyledSongDetail>
  );
};

export default SongDetail;
