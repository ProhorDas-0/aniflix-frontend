import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { useState, useEffect } from "react";
import "./VideoPlayer.css";

const VideoPlayer = ({ videoObj }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoData = videoObj.videoData;
  const handleClick = () => {
    setIsPlaying(true);
  };
  
  const detailsStyle = {
    zIndex: isPlaying ? 0 : 1, // Adjust the z-index based on isPlaying
  };

  useEffect(() => {
    return () => {
      // Any necessary cleanup can be handled here
    };
  }, [videoData]);

  if (!videoData) {
    return <div>Loading...</div>;
  }

  if (!videoData.video_url) {
    return <div>Video not found.</div>;
  }

  const hasCaption = videoData.video_caption && videoData.video_caption.trim() !== '';
  const plyrProps = {
    source: {
      type: "video",
      sources: [
        {
          type: videoData.video_type,
          src: videoData.video_url,
        },
      ],
      poster: videoData.poster,
      ...(hasCaption && {
        tracks: [
          {
            kind: 'captions',
            label: 'English',
            srclang: 'en',
            // src: videoObj.video_subtitle,
            src: videoData.video_caption,
            default: true,
          },
        ],
      }),
    },
    options: {
      captions: { active: hasCaption, language: 'auto', update: hasCaption },
      controls: [
        "play",
        "progress",
        "current-time",
        "mute",
        "volume",
        "fullscreen",
        "captions"
      ],
      settings: 	['captions', 'quality', 'speed', 'loop'],
    },
  };

  return (
    <div onClick={handleClick} className="plyr-container">
      <div className="details" style={detailsStyle}>
        <div className="text">
          <p className="ptitle">{videoObj.para1}</p>
          <p className="pinfo">{videoObj.para2}</p>
        </div>
      </div>
      
      <Plyr {...plyrProps} />
      <div className="btn-next-download">
        <a href={videoData.video_url}
          style={{
            fontSize: '1.1em',
            fontWeight: 600,
            lineHeight: 1,
            padding: '.4rem .6rem',
            display: 'inline-block',
            background: 'rgba(255, 255, 255, .1)',
            borderRadius: '.4rem',
          }}
        >
          Download
        </a>
        {videoObj.next_epi && (
          <a href={videoObj.next_epi}
            style={{
              fontSize: '1.1em',
              fontWeight: 600,
              lineHeight: 1,
              padding: '.4rem .6rem',
              display: 'inline-block',
              background: 'rgba(255, 255, 255, .1)',
              borderRadius: '.4rem',
            }}
          >
            Next
          </a>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
