import React from 'react';
import './EpisodeCards.css';

const EpisodeCards = ({ seasonNumber, episodeNumber, imageUrl, episodeTitle, eid, sid }) => {
  return (
    <div className="episode-bar">
      <a href={`../epiwatch?eid=${sid}s${eid}`}>
        <div className="episode-show">
          <section className="epi-card">
            <div className="thumbnail" style={{ backgroundImage: `url('${imageUrl}')` }}></div>
            <div className="shape"></div>
            <b className="title">{`S${seasonNumber.toString().padStart(2, '0')}•E${episodeNumber.toString().padStart(2, '0')}`}</b>
          </section>
        </div>
      </a>
    </div>
  );
};

export default EpisodeCards;
