import React from 'react';
import colors from '../data/colors';

const CreditCounter = ({ used, available, onUpgrade }) => {
  const total = used + available;
  const percentage = Math.round((used / total) * 100);
  
  // Determinar el color de la barra de progreso según el porcentaje
  let progressColor;
  if (percentage < 50) {
    progressColor = colors.success;
  } else if (percentage < 75) {
    progressColor = colors.warning;
  } else {
    progressColor = colors.error;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-xs">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium">Tus Sorteos</h3>
        <button 
          onClick={onUpgrade}
          className="text-sm px-3 py-1 rounded-full text-white"
          style={{ backgroundColor: colors.primary }}
        >
          Mejorar Plan
        </button>
      </div>
      
      <div className="mb-2">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="h-2.5 rounded-full" 
            style={{ width: `${percentage}%`, backgroundColor: progressColor }}
          ></div>
        </div>
      </div>
      
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Usados: {used}</span>
        <span className="text-gray-600">Disponibles: {available}</span>
      </div>
    </div>
  );
};

export default CreditCounter;
