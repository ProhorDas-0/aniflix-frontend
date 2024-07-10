import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import NavBar from "../../components/NavBar/Navbar";
import axios from "axios"; // Import Axios

import "./ItemWatch.css";

// Helper function to extract query parameters
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ItemWatch = () => {
  const query = useQuery();
  const [movieResponse, setMovieResponse] = useState(null);
  const [videoObj, setVideoObj] = useState(null);
  const apiKey = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      const mid = parseInt(query.get("mid"));

      if (!isNaN(mid)) {
        try {
          const movieRes = await axios.get(`${apiKey}movie/${parseInt(query.get("mid"))}`);
          setMovieResponse(movieRes.data);
          setVideoObj({
            videoData: movieRes.data.mdata.vdata,
            para1: movieRes.data.mdata.title,
            para2: movieRes.data.mdata.release_year,
            video_subtitle : `${apiKey}movie/${parseInt(query.get("mid"))}/caption`
          });
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
      {movieResponse && (
        <>
          <VideoPlayer key={`episode-${movieResponse.mid}`} videoObj={videoObj} />
        </>
      )}
    </div>
  );
};

export default ItemWatch;
