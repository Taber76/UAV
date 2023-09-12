import './styles.css';

function HorizonPitchScale() {
  const lines = [];

  for (let i = -20; i <= 20; i += 10) {
    const lineStyle = {
      transform: `translateY(${i*3.7*-1}px)`,
    };
    lines.push(
      <div className='pitchLine' style={lineStyle} key={i}>
        {i}°
      </div>
    );
  }
  return <div className='pitchScale'>{lines}</div>;
}

export default HorizonPitchScale;