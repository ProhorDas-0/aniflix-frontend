import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import EpisodeSlider from "../../components/Slider/Episode Slider/EpisodeSlider";
import NavBar from "../../components/NavBar/Navbar";
import axios from "axios"; // Import Axios

import "./EpisodeWatch.css";

// Helper function to extract query parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const EpisodeWatch = () => {
  const query = useQuery();
  const apiKey = process.env.REACT_APP_API_URL;
  const [seasonResponse, setSeasonResponse] = useState(null);
  const [episodeResponse, setEpisodeResponse] = useState(null);
  const [videoObj, setVideoObj] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const seidValue = query.get("eid");
      const seid = seidValue ? seidValue.split("s") : [];

      if (seid.length === 2 && !isNaN(seid[0]) && !isNaN(seid[1])) {
        try {
          const seasonRes = await axios.get(`${apiKey}season/${parseInt(seid[0], 10)}`);
          const episodeRes = await axios.get(`${apiKey}episode/${parseInt(seid[1], 10)}`);
          setSeasonResponse(seasonRes.data);
          setEpisodeResponse(episodeRes.data);
          //
          if(seasonRes.data.sdata.episodes[episodeRes.data.episode_number]!==seasonRes.data.sdata.episodes[-1]){
            setVideoObj({
              videoData: episodeRes.data.vdata,
              para1: episodeRes.data.title,
              para2: `Season ${seasonRes.data.sdata.season_number} | Episode ${episodeRes.data.episode_number}`,
              video_subtitle : `${apiKey}episode/${parseInt(seid[1], 10)}/caption`,
              next_epi: `?eid=${parseInt(seid[0])}s${seasonRes.data.sdata.episodes[episodeRes.data.episode_number]}`,
            });
          }
          else{
            setVideoObj({
              videoData: episodeRes.data.vdata,
              para1: episodeRes.data.title,
              para2: `Season ${seasonRes.data.sdata.season_number} | Episode ${episodeRes.data.episode_number}`,
              video_subtitle : `${apiKey}episode/${parseInt(seid[1], 10)}/caption`
            });
          }
        } catch (error) {
          console.error("Error fetching season data:", error);
        }
      }
    };
    fetchData(); // Call the fetchData function once when the component mounts
  }, []); // Empty dependency array ensures it runs only once

  return (
    <div className="watch">
      <NavBar />
      {episodeResponse && (
        <>
          <VideoPlayer key={`episode-${episodeResponse.eid}`} videoObj={videoObj}/>
          <EpisodeSlider sid={seasonResponse?.sid} />
        </>
      )}
    </div>
  );
};

export default EpisodeWatch;
