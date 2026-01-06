import type {
  ApiAlbumResponse,
  ApiResponseError,
  ApiResponseWrapper,
  ApiTrackResponse,
  SongsTypes,
} from "../types/songs_types";

export class ApiSongs {
  title: string;
  artist: string;
  duration: string;
  photo: string;
  saved: boolean;
  idAlbum: string;
  strAlbum: string;
  strArtist: string;
  intYearReleased: string;
  strGenre: string;
  idTrack: string;
  strTrack: string;
  intDuration: string;
  track: {
    idTrack: string;
    idAlbum: string;
    idArtist: string;
    idLyric: string;
    idIMVDB: string | null;
    strTrack: string;
    strAlbum: string;
    strArtist: string;
    strArtistAlternate: string | null;
    intCD: string | null;
    intDuration: string;
    strGenre: string;
    strMood: string | null;
    strStyle: string | null;
    strTheme: string | null;
    strDescriptionEN: string | null;
    strDescriptionDE: string | null;
    strDescriptionFR: string | null;
    strDescriptionCN: string | null;
    strDescriptionIT: string | null;
    strDescriptionJP: string | null;
    strDescriptionRU: string | null;
    strDescriptionES: string | null;
    strDescriptionPT: string | null;
    strDescriptionSE: string | null;
    strDescriptionNL: string | null;
    strDescriptionHU: string | null;
    strDescriptionNO: string | null;
    strDescriptionIL: string | null;
    strDescriptionPL: string | null;
    strTrackThumb: string | null;
    strTrack3DCase: string | null;
    strTrackLyrics: string | null;
    strMusicVid: string | null;
    strMusicVidDirector: string | null;
    strMusicVidCompany: string | null;
    strMusicVidScreen1: string | null;
    strMusicVidScreen2: string | null;
    strMusicVidScreen3: string | null;
    intMusicVidViews: string | null;
    intMusicVidLikes: string | null;
    intMusicVidDislikes: string | null;
    intMusicVidFavorites: string | null;
    intMusicVidComments: string | null;
    intTrackNumber: string | null;
    intLoved: string | null;
    intScore: string | null;
    intScoreVotes: string | null;
    intTotalListeners: string | null;
    intTotalPlays: string | null;
    strMusicBrainzID: string | null;
    strMusicBrainzAlbumID: string;
    strMusicBrainzArtistID: string;
    strLocked: string;
  };
  album: {
    idAlbum: string;
    idArtist: string;
    idLabel: string;
    strAlbum: string;
    strAlbumStripped: string;
    strArtist: string;
    strArtistStripped: string;
    intYearReleased: string;
    strStyle: string;
    strGenre: string;
    strLabel: string;
    strReleaseFormat: string;
    intSales: string;
    strAlbumThumb: string;
    strAlbumThumbHQ: string | null;
    strAlbumBack: string;
    strAlbumCDart: string;
    strAlbumSpine: string;
    strAlbum3DCase: string;
    strAlbum3DFlat: string;
    strAlbum3DFace: string;
    strAlbum3DThumb: string;
    strDescriptionEN: string;
    strDescriptionDE: string;
    strDescriptionFR: string;
    strDescriptionCN: string;
    strDescriptionIT: string;
    strDescriptionJP: string;
    strDescriptionRU: string;
    strDescriptionES: string;
    strDescriptionPT: string;
    strDescriptionSE: string;
    strDescriptionNL: string;
    strDescriptionHU: string;
    strDescriptionNO: string;
    strDescriptionIL: string;
    strDescriptionPL: string;
    intLoved: string;
    intScore: string;
    intScoreVotes: string;
    strReview: string;
    strMood: string;
    strTheme: string | null;
    strSpeed: string;
    strLocation: string | null;
    strMusicBrainzID: string;
    strMusicBrainzArtistID: string;
    strAllMusicID: string;
    strBBCReviewID: string;
    strRateYourMusicID: string;
    strDiscogsID: string;
    strWikidataID: string;
    strWikipediaID: string | null;
    strGeniusID: string;
    strLyricWikiID: string | null;
    strMusicMozID: string | null;
    strItunesID: string | null;
    strAmazonID: string | null;
    strLocked: string;
  };
  tracks: ApiSongs["track"][];
  static api_key = "123";
  static base_url = "https://www.theaudiodb.com/api/v1/json";
  static url: URL;

  constructor(
    title: string,
    artist: string,
    duration: string,
    photo: string,
    idAlbum?: string,
    strAlbum?: string,
    strArtist?: string,
    intYearReleased?: string,
    strGenre?: string,
    idTrack?: string,
    strTrack?: string,
    intDuration?: string,
    saved?: boolean,
    tracks?: ApiSongs["track"][],
    album?: ApiSongs["album"],
    track?: ApiSongs["track"]
  ) {
    this.title = title!;
    this.artist = artist!;
    this.duration = duration!;
    this.photo = photo!;
    this.idAlbum = idAlbum!;
    this.strAlbum = strAlbum!;
    this.strArtist = strArtist!;
    this.intYearReleased = intYearReleased!;
    this.strGenre = strGenre!;
    this.idTrack = idTrack!;
    this.strTrack = strTrack!;
    this.intDuration = intDuration!;
    this.saved = saved!;
    this.tracks = tracks!;
    this.album = album!;
    this.track = track!;
  }

  static convertDuration(duration: string): string {
    const newDuration = parseInt(duration);
    const seconds = Math.floor(newDuration / 1000);
    const minutes = Math.floor(seconds / 60);
    const finalTime = seconds % 60;
    return `${minutes}:${finalTime.toString().padStart(2, "0")}`;
  }

  /**
   * Fetches music data from the AudioDB API based on the specified search type.
   * 
   * This method handles two different API integration scenarios:
   * 1. Album search: Retrieves all albums by a specified artist
   * 2. Track search: Retrieves a specific track by artist and track name
   * 
   * @param type - The type of search to perform. Use "album" to search for albums by artist,
   *               or any other value (typically "track") to search for a specific track.
   * @param artist - The name of the artist to search for. This parameter is URL-encoded
   *                 and used in both album and track searches.
   * @param album - Optional. The name of the track to search for. Required when searching
   *                for tracks (type !== "album"), ignored when searching for albums.
   * 
   * @returns A Promise that resolves to an ApiResponseWrapper containing:
   *          - On success (status 200): ApiAlbumResponse (for album search) or 
   *            ApiTrackResponse (for track search) with the API data
   *          - On failure (status 500): ApiResponseError with error details
   * 
   * @throws The method does not throw errors directly but returns them as part of the
   *         ApiResponseWrapper with status 500.
   * 
   * @example
   * // Search for albums by artist
   * const albumResponse = await ApiSongs.callAPIaudioDB("album", "Coldplay");
   * 
   * @example
   * // Search for a specific track
   * const trackResponse = await ApiSongs.callAPIaudioDB("track", "Coldplay", "Yellow");
   * 
   * @remarks
   * Error scenarios handled:
   * - Network failures: Returns status 500 with error message
   * - API response errors: Returns status 500 with response.statusText
   * - Invalid API responses: Handled by type system, returned as-is
   */
  static async callAPIaudioDB(
    type: string,
    artist: string,
    album?: string
  ): Promise<
    ApiResponseWrapper<ApiAlbumResponse | ApiTrackResponse | ApiResponseError>
  > {
    //
    switch (type) {
      case "album":
        this.url = new URL(
          this.base_url + `/${this.api_key}/searchalbum.php?s=${artist}`
        );
        break;
      default:
        this.url = new URL(
          this.base_url +
            `/${this.api_key}/searchtrack.php?s=${artist}&t=${album}`
        );
    }
    //fetch albums
    const response = await fetch(this.url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    //
    if (!response.ok) {
      return {
        status: 500,
        message:
          `Failed to fetch songs: ${response.statusText}` as unknown as ApiResponseError,
      };
    }
    //
    const data = await response.json();
    //console.log("data from api songs", data);
    return {
      status: 200,
      message: data as ApiAlbumResponse | ApiTrackResponse,
    };
  }

  static saveAlbumsToLocalStorage(
    album: ApiSongs["album"],
    tracks: ApiSongs["track"]
  ): void {
    // Read or initialize with empty object if none.
    const albums = JSON.parse(localStorage.getItem("albums") || "{}");
    // Add or update album.
    albums[album.strAlbum] = {
      tracks: tracks,
    };
    // Save back to localStorage.
    localStorage.setItem("albums", JSON.stringify(albums));
  }

  static getAlbumTracks = (
    albumName: string,
    track: string
  ): ApiSongs["track"] => {
    //console.log("album", albumName, "track", track);

    const albumsData = JSON.parse(localStorage.getItem("albums") || "{}");
    const album = albumsData[albumName];
    //console.log("album", album);

    return album.tracks.find(
      (dbTrack: ApiSongs["track"]) => dbTrack.strTrack === track
    );
  };

  static getSavedSongs({ canciones }: { canciones: SongsTypes[] }) {
    return canciones.filter((song) => song.saved);
  }
}
