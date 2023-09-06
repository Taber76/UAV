import { useEffect, useState } from 'react';
import './styles.css';

function UavVideo({ videoUrl }) {
  const [videoAvailable, setVideoAvailable] = useState(true);

  return (
    <div className='videoBorder'>
      {videoAvailable ? (
        <img
          className="uavVideo" 
          src={videoUrl}
          alt="UAV Video"
        />
      ) : (
        <p className="videoUnavailable">Señal de video perdida</p>
      )}
    </div>
  );
}

export default UavVideo;
