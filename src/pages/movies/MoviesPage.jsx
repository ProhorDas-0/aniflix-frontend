import React, { useState, useMemo, useEffect} from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import NavBar from "../../components/NavBar/Navbar";
import "./MoviesPage.css"; // Ensure the CSS file is imported if needed

const MoviesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(36);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [moviedata, setMoviedata] = useState([]);
  const apiKey = process.env.REACT_APP_API_URL;
  const location = useLocation();
  useEffect(() => {
    // Fetch season data from the API using axios
    axios.get(`${apiKey}movies`)
      .then(response => setMoviedata(response.data))
      .catch(error => console.error("Error fetching movies data:", error));
  }, []);
  // Function to parse query parameters
  const useQuery = () => {
    return new URLSearchParams(location.search);
  };

  const query = useQuery();
  const sortOut = query.get("sort-out") === "true";

  // Group movies by genre
  const moviesByGenre = useMemo(() => {
    return moviedata.reduce((acc, movie) => {
      movie.mdata.category.forEach((genre) => {
        if (!acc[genre]) acc[genre] = [];
        acc[genre].push(movie);
      });
      return acc;
    }, {});
  }, [moviedata]);

  // Toggle selected genre
  const toggleGenre = (genre) => {
    setSelectedGenres((prevSelectedGenres) => {
      if (prevSelectedGenres.includes(genre)) {
        return prevSelectedGenres.filter((g) => g !== genre);
      } else {
        return [...prevSelectedGenres, genre];
      }
    });
  };

  // Filter movies based on the search term and selected genres
  const filteredMovies = useMemo(() => {
    let movies = moviedata;

    if (selectedGenres.length > 0) {
      movies = movies.filter((movie) =>
        selectedGenres.some((genre) => movie.mdata.category.includes(genre))
      );
    }

    if (searchTerm) {
      movies = movies.filter((movie) =>
        movie.mdata.title.toLowerCase().includes(searchTerm)
      );
    }

    return movies;
  }, [searchTerm, selectedGenres, moviedata]);

  // Get current movies for pagination
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Render movies by genre
  const renderMoviesByGenre = () => {
    return Object.keys(moviesByGenre).map((genre) => (
      <React.Fragment key={genre}>
        <h1>{genre}</h1>
        <div className="card-container">
          {moviesByGenre[genre].slice(0, moviesPerPage).map((movie) => (
            <div key={movie.mid} className="card">
              <img
                src={movie.mdata.thumbnail}
                alt={movie.mdata.title}
                className="card-image"
              />
              <div className="card-title">{movie.mdata.title}</div>
            </div>
          ))}
        </div>
      </React.Fragment>
    ));
  };

  return (
    <>
    <NavBar></NavBar>
    <div className="sr-home">
      {!sortOut && (
        <>
          <div className="search">
      <input
        type="text"
        placeholder="Search..."
        className="search"
        onChange={(event) => {
          setCurrentPage(1);
          setSearchTerm(event.target.value.toLowerCase());
        }}
      />
      <div className="symbol">
        <svg className="cloud">
          <use xlinkHref="#cloud" />
        </svg>
        <svg className="lens">
          <use xlinkHref="#lens" />
        </svg>
      </div>
    </div>
  
<svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
  <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" id="cloud">
    <path d="M31.714,25.543c3.335-2.17,4.27-6.612,2.084-9.922c-1.247-1.884-3.31-3.077-5.575-3.223h-0.021
	C27.148,6.68,21.624,2.89,15.862,3.931c-3.308,0.597-6.134,2.715-7.618,5.708c-4.763,0.2-8.46,4.194-8.257,8.919
	c0.202,4.726,4.227,8.392,8.991,8.192h4.873h13.934C27.784,26.751,30.252,26.54,31.714,25.543z" />
  </symbol>
  <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" id="lens">
    <path d="M15.656,13.692l-3.257-3.229c2.087-3.079,1.261-7.252-1.845-9.321c-3.106-2.068-7.315-1.25-9.402,1.83
	s-1.261,7.252,1.845,9.32c1.123,0.748,2.446,1.146,3.799,1.142c1.273-0.016,2.515-0.39,3.583-1.076l3.257,3.229
	c0.531,0.541,1.404,0.553,1.95,0.025c0.009-0.008,0.018-0.017,0.026-0.025C16.112,15.059,16.131,14.242,15.656,13.692z M2.845,6.631
	c0.023-2.188,1.832-3.942,4.039-3.918c2.206,0.024,3.976,1.816,3.951,4.004c-0.023,2.171-1.805,3.918-3.995,3.918
	C4.622,10.623,2.833,8.831,2.845,6.631L2.845,6.631z" />
  </symbol>
</svg>
          <div className="genre-boxes">
            {Object.keys(moviesByGenre).map((genre, index) => (
              <button
                key={index}
                className={`genre-box ${selectedGenres.includes(genre) ? "active" : ""}`}
                onClick={() => {
                  setCurrentPage(1);
                  toggleGenre(genre);
                }}
              >
                {genre}
              </button>
            ))}
          </div>
        </>
      )}
      {sortOut ? (
        renderMoviesByGenre()
      ) : (
        <div className="card-container">
          {currentMovies.map((movie) => (
            <a href={`./watch?mid=${movie.mid}`} key={movie.mid} className="card">
              <img
                src={movie.mdata.thumbnail}
                alt={movie.mdata.title}
                className="card-image"
              />
              <div className="card-title">{movie.mdata.title}</div>
            </a>
          ))}
        </div>
      )}
      <nav>
        <ul className="pagination">
          {Array.from(
            { length: Math.ceil(filteredMovies.length / moviesPerPage) },
            (_, index) => (
              <li key={index}>
                <a
                  onClick={() => paginate(index + 1)}
                  href="#!"
                  className={currentPage === index + 1 ? "active" : ""}
                >
                  {index + 1}
                </a>
              </li>
            )
          )}
        </ul>
      </nav>
    </div>
    </>
  );
};

export default MoviesPage;
