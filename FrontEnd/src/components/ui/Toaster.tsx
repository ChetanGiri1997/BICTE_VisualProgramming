import React, { useState, useEffect } from 'react';
import { toast, ToastType, ToastMessage } from '../../utils/toast';
import { AlertCircle, CheckCircle, XCircle, Info, X } from 'lucide-react';

export const Toaster: React.FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handleToast = (message: ToastMessage) => {
      setToasts((prevToasts) => [...prevToasts, message]);
      
      // Auto remove after duration
      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.filter((t) => t.id !== message.id));
      }, message.duration);
    };

    toast.subscribe(handleToast);
    return () => toast.unsubscribe(handleToast);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
  };

  const getToastIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-success-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-error-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-warning-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-primary-500" />;
      default:
        return null;
    }
  };

  const getToastClasses = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'border-success-500 bg-success-50';
      case 'error':
        return 'border-error-500 bg-error-50';
      case 'warning':
        return 'border-warning-500 bg-warning-50';
      case 'info':
        return 'border-primary-500 bg-primary-50';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`max-w-sm rounded-lg border-l-4 shadow-md px-4 py-3 flex items-start ${getToastClasses(
            toast.type
          )} animate-slideIn`}
        >
          <div className="flex-shrink-0 mr-3 pt-0.5">{getToastIcon(toast.type)}</div>
          <div className="flex-1 mr-2">
            <p className="text-sm font-medium text-gray-900">{toast.message}</p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 text-gray-400 hover:text-gray-500 focus:outline-none"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};