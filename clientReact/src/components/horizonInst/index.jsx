import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import HorizonPitchScale from '../horizonPichScale';
import HorizonInfo from '../horizonInfo';

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
      <HorizonPitchScale />
      <div className='horizon' style={horizonStyle}>
        <div className='horizonHalf horizonHalfBlue'></div>
        <div className='horizonHalf horizonHalfGreen'></div>
      </div>
      <HorizonInfo
        width='25%'
        text='ROLL'
        value={roll}
        unit='deg'
        vPos='0%'
        hPos='0%'
        color='red'
        fontSize='12px'
        backgroundColor='rgba(255, 255, 255, 0.2)'
      />
      <HorizonInfo
        width='25%'
        text='PITCH'
        value={pitch}
        unit='deg'
        vPos='10%'
        hPos='0%'
        color='red'
        fontSize='12px'
        backgroundColor='rgba(255, 255, 255, 0.2)'
      />
      <HorizonInfo
        width='40%'
        text='DISARMED'
        vPos='32%'
        hPos='28%'
        color='red'
        fontSize='24px'
      />
    </div>
  );
}

export default HorizonInst;
5