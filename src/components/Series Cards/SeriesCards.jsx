import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SeriesCards.css";

const SeriesCards = () => {
  const [series, setSeries] = useState([]);
  const apiKey = process.env.REACT_APP_API_URL;

  useEffect(() => {
    // Fetch series data from the API (replace with your actual API endpoint)
    const fetchSeries = async () => {
      try {
        const response = await fetch(`${apiKey}series`);
        if (response.ok) {
          const data = await response.json();
          setSeries(data.slice(0, 12)); // Limit to the first 12 series
        } else {
          console.error("Error fetching series data");
        }
      } catch (error) {
        console.error("Error fetching series data:", error);
      }
    };

    fetchSeries();
  }, []);

  return (
    <div className="series">
      <div className="header-container">
        <h1>Series</h1>
        <Link to="./tvseries" className="series-see-more">
          See More
        </Link>
      </div>
      <div className="card-container">
        {series.map((series) => (
          <Link
            to={`/series?seid=${series.seid}`}
            key={series.seid}
            className="card-link"
          >
            <div className="card">
              <img
                src={series.sedata.thumbnail}
                alt={series.sedata.title}
                className="card-image"
              />
              <div className="card-title">{series.sedata.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SeriesCards;
