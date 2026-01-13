import SearchResults from "./search_results";
import AlbumBoard from "./album_board";
import { StyledAside, StyledMain } from "../styles/StyledBody";
import Library from "./library";

const Body = () => {
  //
  //
  return (
    <StyledMain>
      <StyledAside>
        <SearchResults />
        <Library />
      </StyledAside>
      <AlbumBoard />
    </StyledMain>
  );
};

export default Body;
