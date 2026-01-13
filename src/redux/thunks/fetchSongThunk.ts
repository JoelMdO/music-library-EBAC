import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiSongs } from "../../utils/api_songs";
import type {
  AllSongsMap,
  ApiAlbumResponse,
  ApiError,
  ApiTrackResponse,
} from "../../types/songs_types";

///--------------------------------------------------------
// Thunk asíncrono:
// Usa createAsyncThunk para definir un thunk llamado fetchSongs.
// En este thunk:
// Realiza una petición al endpoint de búsqueda de álbumes.
// Maneja los estados de carga, éxito y error.
// Se usa thunk y no slice porque es una operación asíncrona compleja que
// involucra fetching data del API, múltiples pasos y manejo de errores.
// El thunk devuelve un objeto que mapea los nombres de los álbumes a sus pistas.
///--------------------------------------------------------
export const fetchSongs = createAsyncThunk<
  AllSongsMap,
  string,
  { rejectValue: ApiError }
>("songs/fetchSongs", async (artist, { rejectWithValue }) => {
  try {
    //
    const tracksOfTheAlbum: AllSongsMap = {};
    //

    const albums = await ApiSongs.callAPIaudioDB("album", artist);
    if (albums.status !== 200) {
      return rejectWithValue({
        message: "Error fetching albums for artist: " + artist,
        status: albums.status,
      });
    }
    //Get the tracks data for each album
    const albumsMessage = albums.message as ApiAlbumResponse;
    const albumsData = albumsMessage.album || [];

    if (Array.isArray(albumsData)) {
      await Promise.all(
        albumsData.map(async (albumItem) => {
          const track = await ApiSongs.callAPIaudioDB(
            "track",
            artist,
            albumItem.strAlbum
          );
          if (track.status !== 200) {
            return rejectWithValue({
              message:
                "Error fetching tracks or no tracks found for artist: " +
                artist,
              status: track.status,
            });
          }
          const trackMessage = track.message as ApiTrackResponse;
          const rawTrack = trackMessage.track;
          const trackData = Array.isArray(rawTrack)
            ? rawTrack
            : rawTrack
            ? [rawTrack]
            : [];
          tracksOfTheAlbum[albumItem.strAlbum] = {
            tracks: trackData,
          };
        })
      );
    }
    return tracksOfTheAlbum;
  } catch (e) {
    return rejectWithValue({
      message: e instanceof Error ? e.message : String(e),
    });
  }
});
