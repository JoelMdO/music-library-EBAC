import songs from "../data/songs";
export class ApiSongs {
  title: string;
  artist: string;
  duration: string;
  photo: string;

  //   constructor(title: string, artist: string, duration: string) {
  constructor(title: string, artist: string, duration: string, photo: string) {
    this.title = title;
    this.artist = artist;
    this.duration = duration;
    this.photo = photo;
  }

  static loadSongs(): ApiSongs[] {
    return songs.map(
      (song) =>
        new ApiSongs(song.titulo, song.artista, song.duracion, song.photo)
    );
  }
}
