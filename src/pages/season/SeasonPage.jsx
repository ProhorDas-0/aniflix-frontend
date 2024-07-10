// EpisodeSlider.js
import React, { useState, useEffect }from 'react';
import axios from 'axios';
import "./SeasonPage.css";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import EpisodeCards from "../../components/Episode Cards/EpisodeCards";
import NavBar from "../../components/NavBar/Navbar";
import Banner from '../../components/Banner/Banner';
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SeasonPage = () => {
  // Find the season data by sid
  const [seasonData, setSeasonData] = useState(null);
  const [episodeDatas, setEpisodeDatas] = useState([]);
  const apiKey = process.env.REACT_APP_API_URL;
  const query = useQuery();
  const sid = parseInt(query.get("sid"));

  useEffect(() => {
    // Fetch season data from the API using axios
    axios.get(`${apiKey}season/${sid}`)
      .then(response => setSeasonData(response.data))
      .catch(error => console.error("Error fetching season data:", error));
  }, [sid]);

  useEffect(() => {
    if (seasonData) {
      // Fetch episode data for each episodeId in seasonData
      seasonData.sdata.episodes.forEach(episodeId => {
        axios.get(`${apiKey}episode/${episodeId}`)
          .then(response => {
            setEpisodeDatas(prevEpisodeDatas => [...prevEpisodeDatas, response.data]);
          })
          .catch(error => console.error("Error fetching episode data:", error));
      });
    }
  }, [seasonData]);

  if (!seasonData) {
    return <div>Season not found</div>;
  }

  return (
    <>
    <NavBar></NavBar>
    <div className='home'>
    <div className='swiper'><Banner type={"sid"} id={sid} /></div>
      <div className='container'>
      <h1 className="sn-type">Episodes</h1>
      <div className="episode-container">
        {episodeDatas.map(episodeData => {

          if (!episodeData) return null;

          return (
            <EpisodeCards
              eid={episodeData.eid}
              key={episodeData.eid} // Use eid as the key for better performance
              sid={seasonData.sid}
              seasonNumber={seasonData.sdata.season_number}
              episodeNumber={episodeData.episode_number} // Assuming episodes are in order
              imageUrl={episodeData.vdata.poster.replace("original", "w500") || 'default-poster.jpg'} // Replace 'default-poster.jpg' with your default poster
              episodeTitle={episodeData.title}
            />
          );
        })}
      </div>
      </div>
    </div>
    </>
  );
};

export default SeasonPage;
