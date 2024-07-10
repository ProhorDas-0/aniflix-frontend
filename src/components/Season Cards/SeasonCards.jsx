import React from 'react';
import './SeasonCards.css';

const SeasonCards = ({ imageUrl, seasonTitle, year, episodeNums, sid}) => {
  return (
    <a href={`./season?sid=${sid}`}>
    <>
    <div className='season-bar-show'>
      
        <div className='season-cover' style={{ backgroundImage: `url('${imageUrl}`}}></div>
            <div className='stext'>
                <p className='stitle'>{seasonTitle}</p>
                <p className='sinfo'>{`${year} • ${episodeNums} Episodes`}</p>
            </div>
        </div>
    </>
    </a>
  );
};

export default SeasonCards;
