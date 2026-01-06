import type {
  ApiAlbumResponse,
  ApiResponseError,
  ApiResponseWrapper,
  ApiTrackResponse,
  SongsTypes,
} from "../types/songs_types";

/**
 * ApiSongs class - Handles interaction with TheAudioDB API for retrieving music data.
 * 
 * This class provides functionality to fetch and manage music information including
 * albums, tracks, and artist details from TheAudioDB API. It also handles local storage
 * operations for saving and retrieving album data.
 * 
 * @class ApiSongs
 * @example
 * // Create a new song instance
 * const song = new ApiSongs("Song Title", "Artist Name", "3:45", "photo.jpg");
 * 
 * // Fetch album data from API
 * const albumData = await ApiSongs.callAPIaudioDB("album", "Pink Floyd");
 */
export class ApiSongs {
  /** Display title of the song */
  title: string;
  /** Artist name */
  artist: string;
  /** Formatted duration string (e.g., "3:45") */
  duration: string;
  /** URL or path to album/track photo */
  photo: string;
  /** Flag indicating if the song is saved to user's library */
  saved: boolean;
  /** TheAudioDB album ID */
  idAlbum: string;
  /** Album name */
  strAlbum: string;
  /** Artist name (from album data) */
  strArtist: string;
  /** Year the album was released */
  intYearReleased: string;
  /** Music genre */
  strGenre: string;
  /** TheAudioDB track ID */
  idTrack: string;
  /** Track name */
  strTrack: string;
  /** Track duration in milliseconds */
  intDuration: string;
  
  /**
   * Detailed track information object from TheAudioDB API.
   * Contains comprehensive metadata about a specific track including IDs,
   * descriptions in multiple languages, music video information, and statistics.
   */
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
  
  /**
   * Detailed album information object from TheAudioDB API.
   * Contains comprehensive metadata about an album including IDs, artist info,
   * label details, descriptions in multiple languages, artwork URLs, ratings,
   * and links to external music databases.
   */
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
  
  /** Array of track objects associated with an album */
  tracks: ApiSongs["track"][];
  
  /** API key for TheAudioDB API */
  static api_key = "123";
  /** Base URL for TheAudioDB API */
  static base_url = "https://www.theaudiodb.com/api/v1/json";
  /** Constructed URL for API requests */
  static url: URL;

  /**
   * Creates an instance of ApiSongs.
   * 
   * @param {string} title - Display title of the song
   * @param {string} artist - Artist name
   * @param {string} duration - Formatted duration string
   * @param {string} photo - URL or path to album/track photo
   * @param {string} [idAlbum] - TheAudioDB album ID
   * @param {string} [strAlbum] - Album name
   * @param {string} [strArtist] - Artist name
   * @param {string} [intYearReleased] - Year the album was released
   * @param {string} [strGenre] - Music genre
   * @param {string} [idTrack] - TheAudioDB track ID
   * @param {string} [strTrack] - Track name
   * @param {string} [intDuration] - Track duration in milliseconds
   * @param {boolean} [saved] - Whether the song is saved to user's library
   * @param {ApiSongs["track"][]} [tracks] - Array of track objects
   * @param {ApiSongs["album"]} [album] - Album information object
   * @param {ApiSongs["track"]} [track] - Track information object
   */

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

  /**
   * Converts duration from milliseconds to formatted time string (MM:SS).
   * 
   * @param {string} duration - Duration in milliseconds as a string
   * @returns {string} Formatted duration string (e.g., "3:45")
   * @example
   * ApiSongs.convertDuration("225000"); // Returns "3:45"
   */
  static convertDuration(duration: string): string {
    const newDuration = parseInt(duration);
    const seconds = Math.floor(newDuration / 1000);
    const minutes = Math.floor(seconds / 60);
    const finalTime = seconds % 60;
    return `${minutes}:${finalTime.toString().padStart(2, "0")}`;
  }

  /**
   * Fetches music data from TheAudioDB API.
   * 
   * Supports fetching album information by artist name or track information
   * by artist and track name.
   * 
   * @param {string} type - Type of search: "album" for albums, any other value for tracks
   * @param {string} artist - Artist name to search for
   * @param {string} [album] - Track name (required for track searches)
   * @returns {Promise<ApiResponseWrapper<ApiAlbumResponse | ApiTrackResponse | ApiResponseError>>}
   *          Promise resolving to the API response with status and data
   * @example
   * // Fetch albums by artist
   * const albums = await ApiSongs.callAPIaudioDB("album", "Pink Floyd");
   * 
   * // Fetch specific track
   * const track = await ApiSongs.callAPIaudioDB("track", "Pink Floyd", "Wish You Were Here");
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

  /**
   * Saves album and its tracks to browser's localStorage.
   * 
   * Stores album data in a structured format where album names are keys
   * and values contain track arrays. Updates existing albums or adds new ones.
   * 
   * @param {ApiSongs["album"]} album - Album information object to save
   * @param {ApiSongs["track"]} tracks - Array of track objects associated with the album
   * @returns {void}
   * @example
   * ApiSongs.saveAlbumsToLocalStorage(albumData, trackArray);
   */
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

  /**
   * Retrieves a specific track from an album stored in localStorage.
   * 
   * @param {string} albumName - Name of the album to search in
   * @param {string} track - Name of the track to find
   * @returns {ApiSongs["track"]} The track object if found
   * @example
   * const track = ApiSongs.getAlbumTracks("The Wall", "Another Brick in the Wall");
   */
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

  /**
   * Filters and returns only songs that have been saved to the user's library.
   * 
   * @param {Object} params - Parameters object
   * @param {SongsTypes[]} params.canciones - Array of songs to filter
   * @returns {SongsTypes[]} Array of songs where saved is true
   * @example
   * const savedSongs = ApiSongs.getSavedSongs({ canciones: allSongs });
   */
  static getSavedSongs({ canciones }: { canciones: SongsTypes[] }) {
    return canciones.filter((song) => song.saved);
  }
}
