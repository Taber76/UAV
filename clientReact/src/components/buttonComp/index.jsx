import './styles.css'

const ButtonComp = ({ type, name }) => {
  return (
    <div className='divButtonsContainer'>
      <div className='divBackgroundButtons' />
      <button type={type} name={name} className='buttons'>{name}</button>
    </div>
  )
}

export default ButtonComp