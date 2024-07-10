import React from "react";
import Footer from "./components/Footer Elements/Footer";
import "./index.css";
import Slider from "./components/Slider/Home Slider/Slider";
import NavBar from "./components/NavBar/Navbar";
function App() {
  
  return (
    <div className="App">
      <NavBar />
      <Slider ></Slider>
      <Footer/>
    </div>
  );
}

export default App;
