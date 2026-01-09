import { Guitar } from "lucide-react";
import { StyledHeader } from "../styles/StyledHeader";

const Header = () => {
  return (
    <>
      <StyledHeader>
        <Guitar
          className="header-guitar-icon"
          size={50}
          color="var(--guitar-color)"
        />
        <h1 className="header-title">My Music Library</h1>
      </StyledHeader>
    </>
  );
};

export default Header;
