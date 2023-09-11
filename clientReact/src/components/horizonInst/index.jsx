import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import './styles.css';

function HorizonInst() {
  const [roll, setRoll] = useState(90);
  const [pitch, setPitch] = useState(0);

  const uavData = useSelector((state) => state.uav);

  useEffect(() => {
    setPitch(uavData.pitch);
    setRoll(uavData.roll);
  }, [uavData.pitch, uavData.roll]);

  const horizonStyle = {
    transform: `translateX(-25%) translateY(${pitch-200}px) rotate(${roll}deg)`,
  };

  return (
    <div className='horizonBorder'>
      <div className='horizon' style={horizonStyle}>
        <div className='horizonHalf horizonHalfBlue'></div>
        <div className='horizonHalf horizonHalfGreen'></div>
      </div>
      <div className='uavData'>ALT 50m | VEL 25m/s</div>
    </div>
  );
}

export default HorizonInst;
