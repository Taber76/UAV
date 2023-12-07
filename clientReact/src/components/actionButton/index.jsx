import './styles.css'

const ActionButton = ({ type, name, onClick, active, buttonWidth, textSize }) => {
  const buttonStyle = {
    width: buttonWidth || 'auto', // Si buttonWidth no está definido, usa 'auto' como valor por defecto
    fontSize: textSize || 'inherit',
    // backgroundColor: active ? '#4CAF50' : '#ffffff',  // Cambiar el color de fondo si el botón está activo
    color: active ? '#ffffff' : '#000000',  // Cambiar el color del texto si el botón está activo
  };

  return (
    <div className='rounded-md border border-gray-300 containerButton'>
      <button type={type} name={name} className='buttons' style={buttonStyle}>
        {name}
      </button>
    </div>
  );
};

export default ActionButton