import { io, Socket } from 'socket.io-client';

interface SocketEventData {
  [key: string]: any;
}

class NotificationSocket {
  private socket: Socket | null = null;
  private listeners: Map<string, Array<(data: SocketEventData) => void>> = new Map();
  private token: string | null = null;

  connect(token: string): void {
    if (this.socket?.connected) {
      console.log('✅ Socket already connected');
      return;
    }

    this.token = token;
    const apiUrl = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

    console.log('🔌 Connecting to Socket.IO server:', apiUrl);

    // this.socket = io(apiUrl, {
    //   auth: {
    //     token: token
    //   },
    //   reconnection: true,
    //   reconnectionDelay: 1000,
    //   reconnectionAttempts: 5,
    //   transports: ['websocket', 'polling']
    // });

    this.socket = io({
  // This explicitly tells the client to use the /socket.io/ path,
  // which is what our Nginx server is configured to listen for.
  path: "/socket.io/",
  
  // The rest of your options are correct
  auth: {
    token: token
  },
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5,
  transports: ['websocket', 'polling']
});

    this.setupListeners();
  }

  private setupListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('✅ Socket connected:', this.socket?.id);
      this.emit('connected', { socketId: this.socket?.id });
    });

    this.socket.on('disconnect', (reason) => {
      console.log('⚠️ Socket disconnected:', reason);
      this.emit('disconnected', { reason });
    });

    this.socket.on('connect_error', (error) => {
      console.error('❌ Socket connection error:', error.message);
      this.emit('connectionError', { error: error.message });
    });

    // Listen for new notifications
    this.socket.on('notification:new', (notification) => {
      console.log('📬 New notification received:', notification);
      this.emit('notification', notification);
    });

    // Listen for unread count updates
    this.socket.on('notification:unread-count', (data) => {
      console.log('📊 Unread count updated:', data.count);
      this.emit('unreadCount', data.count);
    });

    // Listen for notification history (on connect)
    this.socket.on('notification:history', (data) => {
      console.log('📜 Notification history received:', data.notifications.length);
      this.emit('history', data.notifications);
    });

    // Listen for errors
    this.socket.on('notification:error', (error) => {
      console.error('❌ Notification error:', error);
      this.emit('error', error);
    });
  }

  // Mark notifications as read
  markAsRead(notificationIds: number[]) {
    if (!this.socket?.connected) {
      console.warn('⚠️ Socket not connected');
      return;
    }
    console.log('📝 Marking notifications as read:', notificationIds);
    this.socket.emit('notification:mark-read', { notificationIds });
  }

  // Mark all notifications as read
  markAllAsRead() {
    if (!this.socket?.connected) {
      console.warn('⚠️ Socket not connected');
      return;
    }
    console.log('📝 Marking all notifications as read');
    this.socket.emit('notification:mark-all-read');
  }

  // Subscribe to events
  on(event: string, callback: (data: any) => void) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)?.push(callback);
  }

  // Unsubscribe from events
  off(event: string, callback?: (data: any) => void) {
    if (!this.listeners.has(event)) return;
    
    if (callback) {
      const callbacks = this.listeners.get(event) || [];
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    } else {
      this.listeners.delete(event);
    }
  }

  // Emit to listeners
  private emit(event: string, data: any) {
    if (!this.listeners.has(event)) return;
    
    this.listeners.get(event)?.forEach(callback => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in ${event} listener:`, error);
      }
    });
  }

  // Check if connected
  isConnected() {
    return this.socket?.connected || false;
  }

  // Disconnect
  disconnect() {
    if (this.socket) {
      console.log('🔌 Disconnecting socket');
      this.socket.disconnect();
      this.socket = null;
      this.listeners.clear();
    }
  }

  // Reconnect
  reconnect() {
    if (this.token) {
      this.disconnect();
      this.connect(this.token);
    }
  }
}

// Create singleton instance
const notificationSocket = new NotificationSocket();

export default notificationSocket;
