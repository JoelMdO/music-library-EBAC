import "../src/styles/App.css";
import Header from "./components/header";
import Main from "./components/main";
import "../src/styles/Main.css";
import { useEffect } from "react";

function App() {
  return (
    //
    useEffect(() => {
      console.log("App updated");
    }, []),
    (
      //
      <>
        <Header />
        <Main />
      </>
    )
  );
}

export default App;
