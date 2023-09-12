import './styles.css';

function HorizonInfo ({ width, text, value, unit, vPos, hPos, color, fontSize, backgroundColor }) {

  return (
    <div 
      className='horizonInfo'
      style={{
        width: width,
        top: vPos,
        left: hPos,
        fontSize: fontSize,
        color: color,
        backgroundColor: backgroundColor
      }}>
      {text} {value}{unit}
    </div>
  )
}

export default HorizonInfo