import React, { useEffect } from 'react';
import NotificationBar from './NotificationBar';
import colors from '../data/colors';

// Componente para mostrar notificaciones cuando el usuario está cerca o ha alcanzado su límite de créditos
const CreditLimitNotification = ({ currentUser, showNotificationMessage, showNotification, notificationMessage, notificationType, closeNotification }) => {
  useEffect(() => {
    // Verificar si el usuario existe y tiene datos de créditos
    if (currentUser) {
      const { drawsAvailable, drawsUsed } = currentUser;
      const totalDraws = drawsAvailable + drawsUsed;
      
      // Si no quedan sorteos disponibles
      if (drawsAvailable === 0) {
        showNotificationMessage(
          '¡Has alcanzado el límite de sorteos disponibles! Actualiza tu plan para participar en más eventos.',
          'credit'
        );
      } 
      // Si queda solo 1 sorteo disponible
      else if (drawsAvailable === 1) {
        showNotificationMessage(
          '¡Te queda solo 1 sorteo disponible! Considera actualizar tu plan para no perderte ningún evento.',
          'warning'
        );
      }
      // Si ha usado más del 75% de sus sorteos
      else if (drawsUsed > 0 && (drawsUsed / totalDraws) >= 0.75) {
        showNotificationMessage(
          `Has usado ${drawsUsed} de ${totalDraws} sorteos. ¡Aprovecha los ${drawsAvailable} que te quedan!`,
          'info'
        );
      }
    }
  }, [currentUser, showNotificationMessage]);

  if (!showNotification) return null;

  return (
    <NotificationBar 
      message={notificationMessage} 
      type={notificationType} 
      onClose={closeNotification} 
    />
  );
};

export default CreditLimitNotification;
