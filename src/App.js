import React from "react";
import "./App.css";
import Landing from "./components/Landing";
import Station from "./components/Station";
import Footer from "./components/shared/Footer";

function App() {
  return (
    <>
      <Landing />
      <Station id="app" />
      <Footer />
    </>
  );
}

export default App;
