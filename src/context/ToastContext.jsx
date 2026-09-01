import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import './Toast.css';

const ToastContext = createContext();

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
    delete timers.current[id];
  }, []);

  const showToast = useCallback(
    (message, type = 'success', duration = 2600) => {
      const id = Date.now() + Math.random();
      setToasts((prev) => [...prev, { id, message, type }]);
      timers.current[id] = window.setTimeout(() => dismissToast(id), duration);
    },
    [dismissToast]
  );

  useEffect(() => {
    const active = timers.current;
    return () => {
      Object.values(active).forEach((t) => window.clearTimeout(t));
    };
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-region" aria-live="polite" aria-atomic="false">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast--${toast.type}`} role="status">
            <span className="toast-icon" aria-hidden="true">
              {toast.type === 'success' ? '✓' : toast.type === 'remove' ? '✕' : '♥'}
            </span>
            <span className="toast-message">{toast.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};