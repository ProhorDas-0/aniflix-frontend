import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import MoviesPage from "./pages/movies/MoviesPage";
import ItemWatch from "./pages/watch/ItemWatch";
import EpisodeWatch from "./pages/watch/EpisodeWatch";
import SeriesPage from "./pages/series/SeriesPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SeasonPage from "./pages/season/SeasonPage";
import TvSeriesPage from "./pages/series/TvSeriesPage"
// Get the root element from the document
const rootElement = document.getElementById("root");
// Create a root
const root = createRoot(rootElement);

// Use the root.render method to render the component tree
root.render(
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/watch" element={<ItemWatch />} />
        <Route path="/epiwatch" element={<EpisodeWatch />} />
        <Route path="/series" element={<SeriesPage />} />
        <Route path="/season" element={<SeasonPage/>} />
        <Route path="/tvseries" element={<TvSeriesPage></TvSeriesPage>}/>
        {/* ... other routes */}
      </Routes>
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
