import React from "react";
import { ApiSongs } from "../utils/api_songs";
import type { ApiAlbumResponse, ApiTrackResponse } from "../types/songs_types";

const useSearchHook = ({
  artist,
  setLoading,
  setError,
  setAllSongs,
  setNoArtist,
  setDbUpdated,
}: {
  artist: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setAllSongs: React.Dispatch<
    React.SetStateAction<Record<string, { tracks: ApiSongs["track"][] }>>
  >;
  setNoArtist: React.Dispatch<React.SetStateAction<boolean>>;
  setDbUpdated?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  ///--------------------------------------------------------
  // Hook gets the endpoint URL as params
  // and handles the load, error and success states.
  ///--------------------------------------------------------
  React.useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true);
        setNoArtist(artist === "artist");
        setError(null); // Reset error before fetching if any,
        //
        //console.log("artist", artist);
        let tracksOfTheAlbumDataFromStorage: Record<
          string,
          { tracks: ApiSongs["track"][] }
        > = {};
        //

        const albums = await ApiSongs.callAPIaudioDB("album", artist);
        if (albums.status !== 200) {
          setError("Error fetching albums for artist: " + artist);
          return;
        }
        //Get the tracks data for each album
        // const albumsData = albums.message.album as ApiAlbumResponse[] || [];
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
                setError(
                  "Error fetching tracks or no tracks found for artist: " +
                    artist
                );
                return;
              }
              const trackMessage = track.message as ApiTrackResponse;
              const trackData = trackMessage.track || [];
              ApiSongs.saveAlbumsToLocalStorage(albumItem, trackData);
            })
          );
        }

        // new Promise<void>((resolve) => {
        //   setTimeout(() => {
        tracksOfTheAlbumDataFromStorage = JSON.parse(
          localStorage.getItem("albums") || "{}"
        );
        //console.log("started time");

        //   resolve();
        // }, 1000);
        //}),

        //]);
        //
        setAllSongs(
          tracksOfTheAlbumDataFromStorage as Record<
            string,
            { tracks: ApiSongs["track"][] }
          >
        );
        setDbUpdated!(true);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    };
    if (artist !== "") {
      fetchSongs();
    }
  }, [artist, setAllSongs, setError, setLoading, setNoArtist, setDbUpdated]);
};

export default useSearchHook;
