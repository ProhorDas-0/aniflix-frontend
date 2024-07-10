import React from "react";
import MoviesCard from "../Movie Cards/MoviesCards";
import SeriesCard from "../Series Cards/SeriesCards";
import "./Footer.css"
function Footer() {
  return (
    <div className="footer">
      <SeriesCard/>
      <MoviesCard />

    </div>
  );
}

export default Footer;