import { createContext, useContext, useReducer, Dispatch, useEffect } from "react";

interface Notification {
  id?: number;
  heading: string;
  description: string;
  color?: string;
}

interface NotificationState {
  notifications: Notification[];
  dispatch: Dispatch<any>;
  notify: (payload: Notification) => void;
}

const NotificationContext = createContext<NotificationState | undefined>(undefined);

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return [...state, action.payload];
    case "REMOVE_NOTIFICATION":
      return state.filter((notification) => notification.id !== action.payload);
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const NotificationProvider = ({ children }) => {
  const [notifications, dispatch] = useReducer(notificationReducer, []);
  
  const notify = (payload: Omit<Notification, 'id'>) => {
    const id = Date.now();
    dispatch({ type: 'ADD_NOTIFICATION', payload: { ...payload, id }});
  };

  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => dispatch({type: 'REMOVE_NOTIFICATION', payload: notifications[0].id}), 3000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  return (
    <NotificationContext.Provider value={{ notifications, dispatch, notify }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
