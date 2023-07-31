import { useNotifications } from 'context/notification-context';
import { useRef, useEffect } from 'react';
import Notification from './notification';

const NotificationContainer = () => {
  const { notifications, dispatch } = useNotifications();
  const timers = useRef({}); // Store references to all active timers

  // Start a timer to remove a notification
  const startTimer = (id) => {
    timers.current[id] = setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
      delete timers.current[id];
    }, 3000);
  };

  // Clear a timer to stop a notification from being removed
  const clearTimer = (id) => {
    clearTimeout(timers.current[id]);
    delete timers.current[id];
  };

  // When the list of notifications changes, restart all timers
  useEffect(() => {
    notifications.forEach(({ id }) => {
      if (id in timers.current) {
        clearTimer(id);
      }
      startTimer(id);
    });
  }, [notifications]);

  return (
    <div className='flex-col flex gap-2 xl:gap-4'>
      {notifications.map(({ id, heading, description, color }) => (
        <Notification
          key={id}
          heading={heading}
          description={description}
          color={color}
        />
      ))}
    </div>
  );
};

export default NotificationContainer;
