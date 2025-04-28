import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import EventCard from '../components/EventCard';
import CreditCounter from '../components/CreditCounter';
import NotificationBar from '../components/NotificationBar';
import CreditLimitNotification from '../components/CreditLimitNotification';
import { useAppContext } from '../context/AppContext';

const HomePage = () => {
  const { 
    currentUser, 
    participateInDraw, 
    showNotification, 
    notificationMessage, 
    notificationType, 
    closeNotification,
    events,
    showNotificationMessage
  } = useAppContext();
  
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [regularEvents, setRegularEvents] = useState([]);

  useEffect(() => {
    // Filtrar eventos destacados y regulares
    setFeaturedEvents(events.filter(event => event.featured));
    setRegularEvents(events.filter(event => !event.featured));
  }, [events]);

  const handleParticipate = (eventId) => {
    participateInDraw(eventId);
  };

  const handleUpgrade = () => {
    // Simular redirección a la página de planes
    window.scrollTo({
      top: document.getElementById('planes').offsetTop,
      behavior: 'smooth'
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      {showNotification && (
        <NotificationBar 
          message={notificationMessage} 
          type={notificationType} 
          onClose={closeNotification} 
        />
      )}
      
      <CreditLimitNotification 
        currentUser={currentUser}
        showNotificationMessage={showNotificationMessage}
        showNotification={showNotification}
        notificationMessage={notificationMessage}
        notificationType={notificationType}
        closeNotification={closeNotification}
      />
      
      <Header />
      
      <main className="flex-grow">
        <Banner 
          title="¡Gana entradas a tus conciertos soñados!"
          subtitle="Con una pequeña suscripción mensual podrás participar en sorteos exclusivos para los mejores eventos en Perú."
          buttonText="¡Suscríbete Ahora!"
          onButtonClick={() => {
            window.scrollTo({
              top: document.getElementById('planes').offsetTop,
              behavior: 'smooth'
            });
          }}
          backgroundImage="/images/events/cancion_criolla.jpeg"
        />
        
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Eventos Destacados</h2>
              {currentUser && (
                <CreditCounter 
                  used={currentUser.drawsUsed} 
                  available={currentUser.drawsAvailable} 
                  onUpgrade={handleUpgrade} 
                />
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredEvents.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onParticipate={handleParticipate} 
                />
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Todos los Eventos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {regularEvents.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onParticipate={handleParticipate} 
                />
              ))}
            </div>
          </div>
        </section>
        
        <section id="planes" className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-2">Nuestros Planes</h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              Elige el plan que mejor se adapte a ti y comienza a participar en sorteos para ganar entradas a los mejores eventos.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {useAppContext().subscriptions.map(subscription => (
                <div key={subscription.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg border-t-4" style={{ borderColor: subscription.color }}>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2" style={{ color: subscription.color }}>{subscription.name}</h3>
                    
                    <div className="mb-4">
                      <span className="text-3xl font-bold">S/ {subscription.price.toFixed(2)}</span>
                      <span className="text-gray-600">/mes</span>
                    </div>
                    
                    <div className="mb-6">
                      <p className="font-medium mb-2">Incluye:</p>
                      <ul className="space-y-2">
                        {subscription.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" style={{ color: subscription.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="text-center font-medium mb-4">
                      <span style={{ color: subscription.color }}>
                        {subscription.drawsPerMonth} sorteos
                      </span> por mes
                    </div>
                    
                    <button 
                      className="w-full py-2 rounded-full text-white font-medium transition-colors duration-300"
                      style={{ backgroundColor: subscription.color }}
                      onClick={() => {
                        showNotificationMessage(`Has seleccionado el plan ${subscription.name}. ¡Gracias por tu preferencia!`, 'success');
                      }}
                    >
                      Seleccionar Plan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-2">¿Cómo Funciona?</h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              Participar en nuestros sorteos es muy fácil. Sigue estos simples pasos:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: useAppContext().subscriptions[0].color }}>
                  <span className="text-white text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Suscríbete</h3>
                <p className="text-gray-600">Elige el plan que mejor se adapte a tus necesidades y suscríbete.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: useAppContext().subscriptions[1].color }}>
                  <span className="text-white text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Participa</h3>
                <p className="text-gray-600">Selecciona los eventos que te interesan y participa en los sorteos.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: useAppContext().subscriptions[2].color }}>
                  <span className="text-white text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">¡Gana!</h3>
                <p className="text-gray-600">Si eres el ganador, recibirás tus entradas por correo electrónico.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;
