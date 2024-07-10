import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./EpisodeSlider.css";
import EpisodeCards from "../../Episode Cards/EpisodeCards";

const EpisodeSlider = ({ sid }) => {
  const [seasonData, setSeasonData] = useState(null);
  const [episodeDatas, setEpisodeDatas] = useState([]);
  const apiKey = process.env.REACT_APP_API_URL;

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
      <h1 className="ep-type">Episodes</h1>
      <div className="episode-slider">
        {episodeDatas.map(episodeData => {
          if (!episodeData) return null;

          return (
            <EpisodeCards
              eid={episodeData.eid}
              key={`ep-sd-${episodeData.eid}`}
              sid={seasonData.sid}
              seasonNumber={seasonData.sdata.season_number}
              episodeNumber={episodeData.episode_number}
              imageUrl={episodeData.vdata.poster.replace("original", "w500") || 'default-poster.jpg'}
              episodeTitle={episodeData.title}
            />
          );
        })}
      </div>
    </>
  );
};

export default EpisodeSlider;
