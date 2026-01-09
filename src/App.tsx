import { Routes, Route } from "react-router";
import Home from "./components/home";
import SongDetail from "./components/song_detail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/song/:album/:id" element={<SongDetail />} />
      </Routes>
    </>
  );
}

export default App;
