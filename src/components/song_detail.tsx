import { useNavigate } from "react-router";
//import { ApiSongs } from "../utils/api_songs";
import { Check, FolderPlus, Milestone } from "lucide-react";
import Card from "./card";
import { StyledSongDetail } from "../styles/StyledSongDetail";
import { addSong } from "../redux/librarySlice";
import Swal from "sweetalert2";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
const SongDetail = () => {
  //
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //--------------------------------------------------------
  const track = useSelector((state: RootState) => state.search.filterSongs);
  console.log("track detail", track);
  const [songSaved, setSongSaved] = useState<boolean>(false);
  //--------------------------------------------------------
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
            <h1 className="songs-title">{Object.keys(track)}</h1>
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
          {Object.keys(track).map((albumName: string) =>
            track[albumName].tracks?.map((track) => (
              <>
                <h3> Album: {albumName}</h3>
                <p> Artist: {String(track.strArtist)}</p>
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
                          title: String(track.strTrack),
                          artist: String(track.strArtist),
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
              </>
            ))
          )}
        </div>
      ) : null}
    </StyledSongDetail>
  );
};

export default SongDetail;
