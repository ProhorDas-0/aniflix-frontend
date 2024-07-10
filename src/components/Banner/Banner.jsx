import React, { useState, useEffect } from "react";
import axios from 'axios'; // Import axios at the top
import "./Banner.css";
import { Link } from "react-router-dom";

const Banner = ({ type, id }) => {
  const [contentData, setContentData] = useState(null);
  const [releaseInfo, setReleaseInfo] = useState("");
  const [watchLink, setWatchLink] = useState("");
  const [title, setTitle] = useState("");
  const apiKey = process.env.REACT_APP_API_URL;

  useEffect(() => {
    console.log()
    const fetchData = async () => {
      try {
        if (type === "mid") {
          const response = await axios.get(`${apiKey}movie/${id}`);
          const data = response.data;
          setTitle(data.mdata.title);
          setContentData(data.mdata);
          setReleaseInfo(data.mdata.release_year);
          setWatchLink(`../watch?mid=${id}`);
        } else if (type === "seid") {
          const response = await axios.get(`${apiKey}series/${id}`);
          const data = response.data;
          setTitle(data.sedata.title);
          setContentData(data.sedata);
          setReleaseInfo(data.sedata.release_year);
          setWatchLink(`../series?seid=${id}`);
        } else if (type === "sid") {
          const response = await axios.get(`${apiKey}season/${id}`);
          const data = response.data;
          if (data.sdata.title === `Season ${data.sdata.season_number}`){
            setTitle(data.series_name);
          }
          else{
            setTitle(data.sdata.title);
          }
          setContentData(data.sdata);
          setReleaseInfo(`Season ${data.sdata.season_number} | ${data.sdata.release_year}`);
          setWatchLink(`../season?sid=${id}`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [type, id]);

  return (
    <div className="deslide-item">
      <div className="deslide-cover">
        <div className="deslide-cover-img">
          <img
            className="film-poster-img lazyloaded"
            data-src={contentData?.banner}
            alt={contentData?.title}
            src={contentData?.banner}
          />
        </div>
      </div>
      <div className="deslide-item-content">
        <div className="sno-redate">
          <p>{releaseInfo}</p>
        </div>
        <div className="bn-title">
          <h1>{title}</h1>
        </div>
        <p className="description">{contentData?.description}</p>
        {contentData?.category && (
          <div className="capsules">
            {contentData.category.map((genre, index) => (
              <div key={index} className="capsule">
                {genre}
              </div>
            ))}
          </div>
)}

        <Link to={watchLink} className="watch-now">
          <p className="btn-text">Watch Now</p>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
