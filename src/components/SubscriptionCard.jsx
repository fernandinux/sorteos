import React from 'react';
import colors from '../data/colors';

const SubscriptionCard = ({ subscription, onSelect, isSelected }) => {
  const { id, name, price, drawsPerMonth, features, recommended, color } = subscription;
  
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg ${recommended ? 'border-2 transform scale-105' : 'border'}`}
      style={{ borderColor: recommended ? color : colors.border }}
    >
      {recommended && (
        <div 
          className="py-1 text-center text-white font-semibold"
          style={{ backgroundColor: color }}
        >
          Recomendado
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2" style={{ color }}>{name}</h3>
        
        <div className="mb-4">
          <span className="text-3xl font-bold">S/ {price.toFixed(2)}</span>
          <span className="text-gray-600">/mes</span>
        </div>
        
        <div className="mb-6">
          <p className="font-medium mb-2">Incluye:</p>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" style={{ color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="text-center font-medium mb-4">
          <span style={{ color }}>
            {drawsPerMonth} sorteos
          </span> por mes
        </div>
        
        <button 
          onClick={() => onSelect(id)}
          className={`w-full py-2 rounded-full font-medium transition-colors duration-300 ${
            isSelected 
              ? 'bg-gray-200 text-gray-700 cursor-default' 
              : 'text-white hover:opacity-90'
          }`}
          style={{ backgroundColor: isSelected ? undefined : color }}
          disabled={isSelected}
        >
          {isSelected ? 'Plan Actual' : 'Seleccionar Plan'}
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
