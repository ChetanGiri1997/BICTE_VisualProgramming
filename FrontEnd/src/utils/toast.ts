export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
  duration: number;
}

type ToastSubscriber = (toast: ToastMessage) => void;

class ToastManager {
  private subscribers: ToastSubscriber[] = [];

  subscribe(subscriber: ToastSubscriber) {
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriber: ToastSubscriber) {
    this.subscribers = this.subscribers.filter((s) => s !== subscriber);
  }

  private notify(toast: ToastMessage) {
    this.subscribers.forEach((subscriber) => subscriber(toast));
  }

  private createToast(message: string, type: ToastType, duration: number = 5000) {
    const toast: ToastMessage = {
      id: Date.now().toString(),
      message,
      type,
      duration,
    };
    this.notify(toast);
  }

  success(message: string, duration?: number) {
    this.createToast(message, 'success', duration);
  }

  error(message: string, duration?: number) {
    this.createToast(message, 'error', duration);
  }

  warning(message: string, duration?: number) {
    this.createToast(message, 'warning', duration);
  }

  info(message: string, duration?: number) {
    this.createToast(message, 'info', duration);
  }
}

export const toast = new ToastManager();