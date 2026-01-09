import SearchResults from "./search_results";
import AlbumBoard from "./album_board";
import { useState } from "react";
import type { SearchResultTypes } from "../types/songs_types";
import { StyledAside, StyledMain } from "../styles/StyledBody";
import Library from "./library";

const Body = () => {
  //
  const [selectedSong, setSelectedSong] = useState<
    [artist: string, searched: boolean]
  >(["", false]);
  const [dbUpdated, setDbUpdated] = useState<boolean>(false);
  //
  //
  return (
    <StyledMain>
      <StyledAside>
        <SearchResults
          searched={selectedSong[1]}
          setSelectedSong={({ artist, searched }: SearchResultTypes) =>
            setSelectedSong([artist, searched])
          }
          artist={selectedSong[0]}
          dbUpdated={dbUpdated}
        />
        <Library />
      </StyledAside>
      <AlbumBoard setDbUpdated={setDbUpdated} artist={selectedSong[0]} />
    </StyledMain>
  );
};

export default Body;
