import React from 'react';
import colors from '../data/colors';

const NotificationBar = ({ message, type = 'info', onClose }) => {
  // Determinar el color de fondo según el tipo
  let backgroundColor;
  switch (type) {
    case 'success':
      backgroundColor = colors.success;
      break;
    case 'warning':
      backgroundColor = colors.warning;
      break;
    case 'error':
      backgroundColor = colors.error;
      break;
    case 'credit':
      backgroundColor = colors.primary;
      break;
    default:
      backgroundColor = colors.accent;
  }

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center"
      style={{ backgroundColor }}
    >
      <p className="text-white font-medium">{message}</p>
      <button 
        onClick={onClose}
        className="text-white hover:text-gray-200 focus:outline-none"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default NotificationBar;
