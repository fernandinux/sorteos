import React from 'react';
import colors from '../data/colors';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold" style={{ color: colors.primary }}>
              SorteosPeru
            </h1>
          </div>
          
          <div className="hidden md:flex space-x-6">
            <a href="/" className="text-gray-700 hover:text-primary font-medium">Inicio</a>
            <a href="/eventos" className="text-gray-700 hover:text-primary font-medium">Eventos</a>
            <a href="/planes" className="text-gray-700 hover:text-primary font-medium">Planes</a>
            <a href="/perfil" className="text-gray-700 hover:text-primary font-medium">Mi Perfil</a>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              className="px-4 py-2 rounded-full text-white font-medium"
              style={{ backgroundColor: colors.primary }}
            >
              Iniciar Sesión
            </button>
            <button 
              className="px-4 py-2 rounded-full text-white font-medium hidden md:block"
              style={{ backgroundColor: colors.secondary }}
            >
              Registrarse
            </button>
            
            <button className="md:hidden text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
