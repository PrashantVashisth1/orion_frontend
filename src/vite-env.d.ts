/// <reference types="vite/client" />
interface Window {
  gtag(command: 'set', params: { [key: string]: any }): void;
  gtag(command: 'config', targetId: string, params?: { [key: string]: any }): void;
  gtag(command: 'event', eventName: string, params?: { [key: string]: any }): void;
}
