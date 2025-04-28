import React from 'react';
import colors from '../data/colors';

const EventCard = ({ event, onParticipate }) => {
  const { id, title, artist, date, time, venue, location, description, image, category, originalPrice, featured } = event;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
        {featured && (
          <div 
            className="absolute top-0 right-0 px-3 py-1 text-sm font-semibold text-white"
            style={{ backgroundColor: colors.primary }}
          >
            Destacado
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <p className="text-gray-600 mb-2">{artist}</p>
        
        <div className="flex items-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-gray-700">{date} - {time}</span>
        </div>
        
        <div className="flex items-center mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-gray-700">{venue}, {location}</span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm bg-gray-100 rounded-full px-3 py-1">{category}</span>
          <span className="font-bold" style={{ color: colors.primary }}>S/ {originalPrice.toFixed(2)}</span>
        </div>
        
        <button 
          onClick={() => onParticipate(id)}
          className="w-full py-2 rounded-full text-white font-medium transition-colors duration-300"
          style={{ backgroundColor: colors.secondary, hover: { backgroundColor: colors.primary } }}
        >
          Participar en Sorteo
        </button>
      </div>
    </div>
  );
};

export default EventCard;
