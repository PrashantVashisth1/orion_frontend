import { useState, useEffect, useCallback } from 'react';
import notificationSocket from '../lib/socketClient';
import axios from 'axios';

interface Notification {
  id: number;
  userId: number;
  message: string;
  isRead: boolean;
  createdAt: string;
  postId?: number;
  sessionId?: number;
  needId?: number;
  post?: {
    id: number;
    text: string;
    author: {
      id: number;
      full_name: string;
    };
  };
  session?: {
    id: number;
    title: string;
    type: string;
  };
  need?: {
    id: number;
    title: string;
    type: string;
  };
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const useNotifications = (token: string | null) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial notifications from API
  const fetchNotifications = useCallback(async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/notifications`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: 1, limit: 20 }
      });
      
      setNotifications(response.data.data.notifications);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching notifications:', err);
      setError(err.response?.data?.error?.message || 'Failed to fetch notifications');
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Fetch unread count
  const fetchUnreadCount = useCallback(async () => {
    if (!token) return;

    try {
      const response = await axios.get(`${API_URL}/api/notifications/unread-count`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUnreadCount(response.data.data.count);
    } catch (err) {
      console.error('Error fetching unread count:', err);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    console.log('🔌 Setting up notifications with token');

    // Connect to socket
    notificationSocket.connect(token);

    // Fetch initial data
    fetchNotifications();
    fetchUnreadCount();

    // Listen for new notifications
    const handleNewNotification = (notification: Notification) => {
      console.log('📬 Received new notification:', notification);
      
      setNotifications(prev => [notification, ...prev]);
      setUnreadCount(prev => prev + 1);
      
      // Show browser notification if supported
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('New Notification', {
          body: notification.message,
          icon: '/vite.svg',
          badge: '/vite.svg'
        });
      }

      // Play notification sound (optional)
      // const audio = new Audio('/notification-sound.mp3');
      // audio.play().catch(e => console.log('Could not play sound:', e));
    };

    const handleUnreadCount = (count: number) => {
      console.log('📊 Unread count updated:', count);
      setUnreadCount(count);
    };

    const handleHistory = (history: Notification[]) => {
      console.log('📜 Received notification history:', history.length);
      setNotifications(history);
    };

    const handleConnected = (data: any) => {
      console.log('✅ Socket connected:', data.socketId);
    };

    const handleDisconnected = (data: any) => {
      console.log('⚠️ Socket disconnected:', data.reason);
    };

    const handleConnectionError = (data: any) => {
      console.error('❌ Socket connection error:', data.error);
      setError(`Connection error: ${data.error}`);
    };

    // Subscribe to events
    notificationSocket.on('notification', handleNewNotification);
    notificationSocket.on('unreadCount', handleUnreadCount);
    notificationSocket.on('history', handleHistory);
    notificationSocket.on('connected', handleConnected);
    notificationSocket.on('disconnected', handleDisconnected);
    notificationSocket.on('connectionError', handleConnectionError);

    // Request browser notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        console.log('Notification permission:', permission);
      });
    }

    // Cleanup
    return () => {
      notificationSocket.off('notification', handleNewNotification);
      notificationSocket.off('unreadCount', handleUnreadCount);
      notificationSocket.off('history', handleHistory);
      notificationSocket.off('connected', handleConnected);
      notificationSocket.off('disconnected', handleDisconnected);
      notificationSocket.off('connectionError', handleConnectionError);
    };
  }, [token, fetchNotifications, fetchUnreadCount]);

  const markAsRead = useCallback(async (notificationIds: number[]) => {
    if (!token) return;

    try {
      await axios.post(
        `${API_URL}/api/notifications/mark-read`,
        { notificationIds },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Update local state
      setNotifications(prev => 
        prev.map(n => 
          notificationIds.includes(n.id) 
            ? { ...n, isRead: true } 
            : n
        )
      );
      
      // Also update via socket
      notificationSocket.markAsRead(notificationIds);
    } catch (err) {
      console.error('Error marking notifications as read:', err);
    }
  }, [token]);

  const markAllAsRead = useCallback(async () => {
    if (!token) return;

    try {
      await axios.post(
        `${API_URL}/api/notifications/mark-all-read`,
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      // Update local state
      setNotifications(prev => 
        prev.map(n => ({ ...n, isRead: true }))
      );
      setUnreadCount(0);
      
      // Also update via socket
      notificationSocket.markAllAsRead();
    } catch (err) {
      console.error('Error marking all as read:', err);
    }
  }, [token]);

  const deleteNotification = useCallback(async (notificationId: number) => {
    if (!token) return;

    try {
      await axios.delete(`${API_URL}/api/notifications/${notificationId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Update local state
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  }, [token]);

  const clearAllNotifications = useCallback(async () => {
    if (!token) return;

    try {
      // Delete all notifications one by one
      const deletePromises = notifications.map(n => 
        axios.delete(`${API_URL}/api/notifications/${n.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      );
      
      await Promise.all(deletePromises);
      
      // Clear local state
      setNotifications([]);
      setUnreadCount(0);
    } catch (err) {
      console.error('Error clearing all notifications:', err);
    }
  }, [token, notifications]);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    refreshNotifications: fetchNotifications,
    isConnected: notificationSocket.isConnected()
  };
};
