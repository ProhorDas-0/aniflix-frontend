import React, { useState, useMemo, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import NavBar from "../../components/NavBar/Navbar";
import Banner from "../../components/Banner/Banner";
import SeasonCards from "../../components/Season Cards/SeasonCards";
import axios from 'axios';
import "./SeriesPage.css"
// Helper function to extract query parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SeriesPage = () => {
  const query = useQuery();
  const seid = parseInt(query.get("seid"));
  const apiKey = process.env.REACT_APP_API_URL;
  const [seriesData, setSeriesData] = useState(null);
  const [seasonDatas, setSeasonDatas] = useState([]);

  useEffect(() => {
    // Fetch season data from the API using axios
    axios.get(`${apiKey}series/${seid}`)
      .then(response => setSeriesData(response.data))
      .catch(error => console.error("Error fetching series data:", error));
  }, [seid]);

  useEffect(() => {
    if (seriesData) {
      // Fetch episode data for each episodeId in seasonData
      seriesData.sedata.seasons.forEach(seasonId => {
        axios.get(`${apiKey}season/${seasonId}`)
          .then(response => {
            setSeasonDatas(prevSeasonData => [...prevSeasonData, response.data]);
          })
          .catch(error => console.error("Error fetching episode data:", error));
      });
      console.log(seasonDatas);
    }
  }, [seriesData]);

  return (
    <div className="home">
      <NavBar />
      <>
      <div className='swiper'><Banner type="seid" id={seid} /></div>
        <ul className="season-bars">
          {seasonDatas.map((seasonData) => {
            if (!seasonData) return null;
            return (
              <li className="season-bar" key={seasonData.sid}>
                <SeasonCards
                  imageUrl={seasonData.sdata.thumbnail}
                  seasonTitle={seasonData.sdata.title}
                  year={seasonData.sdata.release_year}
                  episodeNums={seasonData.sdata.episodes.length}
                  sid={seasonData.sid}
                />
              </li>
            );
          })}
        </ul>
      </>
    </div>
  );
};

export default SeriesPage;
