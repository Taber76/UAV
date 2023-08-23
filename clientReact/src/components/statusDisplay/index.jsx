import React from 'react';

const StatusDisplay = ({ text, status }) => {
  let backgroundColor, textColor;

  switch (status) {
    case 'disabled':
      backgroundColor = 'gray';
      textColor = 'white';
      break;
    case 'caution':
      backgroundColor = 'yellow';
      textColor = 'black';
      break;
    case 'danger':
      backgroundColor = 'red';
      textColor = 'white';
      break;
    case 'enabled':
      backgroundColor = 'green';
      textColor = 'white';
      break;
    default:
      backgroundColor = 'white';
      textColor = 'gray';
  }

  const inlineStyle = {
    backgroundColor: backgroundColor,
    color: textColor,
  };

  return (
    <div
      className="inline-flex justify-center w-[200px] rounded-md border border-gray-300 shadow-sm px-4 py-2 text-sm font-medium"
      style={inlineStyle}
    >
      {text}
    </div>
  );
};

export default StatusDisplay;

