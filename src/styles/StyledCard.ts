import styled from "styled-components";

export const StyledCardAlbum = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 4px 6px;
  border-radius: 8px;
  margin: 0.5rem;
  max-width: 800px;
  color: black;
  background-image: linear-gradient(
    180deg,
    var(--card-album-background-color) 10%,
    color-mix(in srgb, white 80%, var(--card-album-background-color) 30%)
  );

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 12px var(--box-shadow-card-song);
  }

  .card-album_disc {
    display: flex;
    padding-top: 15px;
  }
  .card-album_title {
    display: flex;
    text-align: center;
    font-size: clamp(18px, 2em, 24px);
    margin-top: 10px;
    padding: 0;
    margin-bottom: 5px;
  }

  .card-album_info {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 50%;
  }

  .card-album_info h3,
  .card-album_info p,
  .card-album_duration p {
    display: flex;
    margin: 0;
    padding: 0;
  }

  .card-album_info h3 {
    text-align: center;
    font-size: clamp(18px, 20px, 22px);
  }

  .card-album_duration {
    display: flex;
    position: relative;
    flex-direction: row;
    align-items: center;
    justify-content: end;
    width: 100%;
    margin-top: 10px;
    margin-right: 30px;
    gap: 10px;
  }

  .card-album_button {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    gap: 5px;
    margin: 0;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    color: black;
  }
`;

export const StyledJoeCardSong = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(
    180deg,
    var(--card-joe-background-color) 10%,
    color-mix(in srgb, white 80%, var(--card-joe-background-color) 30%)
  );
  box-shadow: 0 4px 6px;
  border-radius: 8px;
  padding: 1rem;
  margin: 0.5rem;
  color: black;
  transition: transform 0.2s;
  height: 200px;
  max-width: 600px;

  & :hover {
    transform: scale(1.05);
    box-shadow: 0 8px 12px var(--box-shadow-card-song);
  }

  & .joe-card-song_title {
    text-align: center;
  }

  & .joe-card-song_img {
    display: flex;
    width: 70px;
    height: 70px;
    border-radius: 15%;
    margin-bottom: 0.5rem;
    box-shadow: 10px 4px 8px var(--img-card-shadow);
  }

  .joe-card-song_info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;

    & p {
      margin: 0;
      padding: 0;
      color: black;
    }
  }

  & .joe-card-song_artist,
  & .joe-card-song_duration {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 5px;
  }
`;

export const StyledCardSong = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 4px 6px;
  border-radius: 8px;
  padding: 1rem;
  margin: 0.5rem;
  color: black;
  max-height: 70dvh;
  max-width: 600px;
  background-image: linear-gradient(
    180deg,
    var(--card-song-background-color) 10%,
    color-mix(in srgb, white 80%, var(--card-song-background-color) 30%)
  );

  & :hover {
    transform: scale(1.05);
    box-shadow: 0 8px 12px var(--box-shadow-card-song);
  }

  & .card-song_headphones {
    display: flex;
    width: 70px;
    height: 70px;
  }

  & .card-song_title {
    display: flex;
    text-align: center;
  }

  & .card-song_info {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 80%;

    & p {
      display: flex;
      margin: 0;
      padding: 0;
      color: black;
    }
  }

  & .card-song_artist {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 100%;
    height: 100%;
  }

  & .card-song_duration,
  & .card-song_likes,
  & .card-song_plays {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 30%;
    gap: 5px;
    margin-right: 10px;
  }
`;
