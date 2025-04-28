import React from 'react';
import colors from '../data/colors';

const Banner = ({ title, subtitle, buttonText, onButtonClick, backgroundImage }) => {
  const bannerStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '500px'
  };

  return (
    <div className="relative" style={bannerStyle}>
      <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl">{subtitle}</p>
        <button 
          onClick={onButtonClick}
          className="px-8 py-3 rounded-full text-white font-bold text-lg"
          style={{ backgroundColor: colors.primary }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Banner;
