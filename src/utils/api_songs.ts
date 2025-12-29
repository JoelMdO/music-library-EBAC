import songs from "../data/songs";
export class ApiSongs {
  title: string;
  artist: string;
  duration: string;
  photo: string;
  saved: boolean;

  constructor(
    title: string,
    artist: string,
    duration: string,
    photo: string,
    saved: boolean
  ) {
    this.title = title;
    this.artist = artist;
    this.duration = duration;
    this.photo = photo;
    this.saved = saved;
  }

  static loadSongs(): ApiSongs[] {
    const savedSongs = this.readSongsFromLocalStorage();
    let newSongs: ApiSongs[] = [];
    //
    if (savedSongs.length > 0) {
      newSongs = this.readSongsFromLocalStorage();
    } else {
      this.saveSongsToLocalStorage(songs);
      newSongs = this.readSongsFromLocalStorage();
    }
    //
    return newSongs.map(
      (song) =>
        new ApiSongs(
          song.title,
          song.artist,
          song.duration,
          song.photo,
          song.saved
        )
    );
  }

  static saveSongsToLocalStorage(songs: ApiSongs[]): void {
    localStorage.setItem("savedSongs", JSON.stringify(songs));
  }

  static readSongsFromLocalStorage(): ApiSongs[] {
    const savedSongs = localStorage.getItem("savedSongs");
    if (savedSongs) {
      return JSON.parse(savedSongs);
    }
    return [];
  }

  static saveSong(title: string): void {
    const songsFromDB = this.readSongsFromLocalStorage();
    const index = songsFromDB.findIndex((song) => song.title === title);
    songsFromDB[index].saved = true;
    this.saveSongsToLocalStorage(songsFromDB);
  }

  static getSavedSongs(canciones: ApiSongs[]): ApiSongs[] {
    if (!canciones) return [];
    //
    const songsFromDB = this.readSongsFromLocalStorage();
    //
    return songsFromDB
      .filter((song) => song.saved === true)
      .map(
        (song) =>
          new ApiSongs(
            song.title,
            song.artist,
            song.duration,
            song.photo,
            song.saved
          )
      );
  }

  static isSongSaved(title: string): boolean {
    const songsFromDB = this.readSongsFromLocalStorage();
    const song = songsFromDB.find((song) => song.title === title);
    return song ? song.saved : false;
  }
}
