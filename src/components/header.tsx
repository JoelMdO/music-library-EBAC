import { Guitar } from "lucide-react";
import "../styles/Header.css";

const Header = () => {
  return (
    <>
      <header className="header">
        <Guitar size={50} color="var(--guitar-color)" />
        <h1 className="header-title">My Music Library</h1>
      </header>
    </>
  );
};

export default Header;
