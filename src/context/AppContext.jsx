import React, { createContext, useState, useContext, useEffect } from 'react';
import eventsData from '../data/events';
import subscriptionsData from '../data/subscriptions';
import usersData from '../data/users';
import participationsData from '../data/participations';

// Crear el contexto
const AppContext = createContext();

// Proveedor del contexto
export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userParticipations, setUserParticipations] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState('info');

  // Inicializar datos del usuario al cargar
  useEffect(() => {
    // Simulamos obtener el usuario actual
    const user = usersData[0]; // Usamos el primer usuario de prueba
    setCurrentUser(user);

    // Obtenemos las participaciones del usuario
    const userParts = participationsData.filter(p => p.userId === user.id);
    setUserParticipations(userParts);
  }, []);

  // Función para participar en un sorteo
  const participateInDraw = (eventId) => {
    // Verificar si el usuario ya está participando
    const alreadyParticipating = userParticipations.some(p => p.eventId === eventId);
    
    if (alreadyParticipating) {
      showNotificationMessage('Ya estás participando en este sorteo', 'info');
      return false;
    }

    // Verificar si el usuario tiene sorteos disponibles
    if (currentUser.drawsAvailable <= 0) {
      showNotificationMessage('Has alcanzado el límite de sorteos disponibles. ¡Actualiza tu plan para participar en más sorteos!', 'credit');
      return false;
    }

    // Crear nueva participación
    const newParticipation = {
      id: userParticipations.length + 1,
      userId: currentUser.id,
      eventId: eventId,
      date: new Date().toISOString(),
      status: 'active'
    };

    // Actualizar estado
    setUserParticipations([...userParticipations, newParticipation]);
    
    // Actualizar usuario
    setCurrentUser({
      ...currentUser,
      drawsUsed: currentUser.drawsUsed + 1,
      drawsAvailable: currentUser.drawsAvailable - 1
    });

    showNotificationMessage('¡Has participado exitosamente en el sorteo!', 'success');
    return true;
  };

  // Función para actualizar plan
  const upgradePlan = (planId) => {
    const plan = subscriptionsData.find(s => s.id === planId);
    
    if (!plan) {
      showNotificationMessage('Plan no encontrado', 'error');
      return false;
    }

    setCurrentUser({
      ...currentUser,
      subscription: planId,
      drawsAvailable: plan.drawsPerMonth - currentUser.drawsUsed
    });

    showNotificationMessage(`Has actualizado tu plan a ${plan.name}`, 'success');
    return true;
  };

  // Función para mostrar notificaciones
  const showNotificationMessage = (message, type = 'info') => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);

    // Agregar a la lista de notificaciones si es relevante
    if (['success', 'credit', 'warning'].includes(type)) {
      const newNotification = {
        message,
        date: new Date().toISOString(),
        type
      };
      
      setNotifications([newNotification, ...notifications]);
    }
  };

  // Función para cerrar notificación
  const closeNotification = () => {
    setShowNotification(false);
  };

  // Valor del contexto
  const contextValue = {
    currentUser,
    userParticipations,
    notifications,
    showNotification,
    notificationMessage,
    notificationType,
    participateInDraw,
    upgradePlan,
    showNotificationMessage,
    closeNotification,
    events: eventsData,
    subscriptions: subscriptionsData
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe ser usado dentro de un AppProvider');
  }
  return context;
};

export default AppContext;
