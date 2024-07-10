import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import "./MoviesCards.css";

const MoviesCards = () => {
  const [movies, setMovies] = useState([]);
  const apiKey = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`${apiKey}movies`);
        if (response.status === 200) {
          const data = response.data.slice(0, 12); // Limit to the first 12 movies
          setMovies(data);
        } else {
          console.error("Error fetching movie data");
        }
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };
  
    fetchMovies();
  }, []);

  return (
    <div className="movies">
      <div className="header-container">
        <h1>Movies</h1>
        <Link to="./movies" className="movies-see-more">
          See More
        </Link>
      </div>
      <div className="card-container">
        {movies.map((movie) => (
          <Link
            to={`./watch?mid=${movie.mid}`}
            key={movie.mid}
            className="card-link"
          >
            <div className="card">
              <img
                src={movie.mdata.thumbnail}
                alt={movie.mdata.title}
                className="card-image"
              />
              <div className="card-title">{movie.mdata.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MoviesCards;
