import { MessageSquare, Heart, Users, TrendingUp, Clock, Bell, Calendar, FileText } from 'lucide-react';

export type NotificationType = 'message' | 'like' | 'follow' | 'trending' | 'reminder' | 'post' | 'session' | 'need' | 'comment';

export interface NotificationDisplay {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timeAgo: string;
  isRead: boolean;
  avatar?: string;
  avatarColor?: string;
}

export const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'message':
    case 'comment':
      return MessageSquare;
    case 'like':
      return Heart;
    case 'follow':
      return Users;
    case 'trending':
      return TrendingUp;
    case 'reminder':
      return Clock;
    case 'post':
      return FileText;
    case 'session':
      return Calendar;
    case 'need':
      return Bell;
    default:
      return Bell;
  }
};

export const getNotificationColor = (type: NotificationType) => {
  switch (type) {
    case 'message':
    case 'comment':
      return 'text-blue-400';
    case 'like':
      return 'text-red-400';
    case 'follow':
      return 'text-green-400';
    case 'trending':
      return 'text-orange-400';
    case 'reminder':
      return 'text-purple-400';
    case 'post':
      return 'text-cyan-400';
    case 'session':
      return 'text-pink-400';
    case 'need':
      return 'text-yellow-400';
    default:
      return 'text-gray-400';
  }
};

export const getAvatarColor = (type: NotificationType) => {
  switch (type) {
    case 'like':
      return 'bg-gradient-to-r from-pink-500 to-rose-600';
    case 'comment':
    case 'message':
      return 'bg-gradient-to-r from-blue-500 to-cyan-600';
    case 'follow':
      return 'bg-gradient-to-r from-green-500 to-emerald-600';
    case 'post':
      return 'bg-gradient-to-r from-purple-500 to-pink-600';
    case 'session':
      return 'bg-gradient-to-r from-cyan-500 to-blue-600';
    case 'need':
      return 'bg-gradient-to-r from-yellow-500 to-orange-600';
    case 'trending':
      return 'bg-gradient-to-r from-orange-500 to-red-600';
    case 'reminder':
      return 'bg-gradient-to-r from-purple-500 to-indigo-600';
    default:
      return 'bg-gradient-to-r from-gray-500 to-gray-600';
  }
};

export const getTimeAgo = (timestamp: string) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return time.toLocaleDateString();
};

export const determineNotificationType = (notification: any): NotificationType => {
  if (notification.message.includes('liked')) return 'like';
  if (notification.message.includes('commented')) return 'comment';
  if (notification.message.includes('post')) return 'post';
  if (notification.message.includes('session')) return 'session';
  if (notification.message.includes('need')) return 'need';
  if (notification.message.includes('following')) return 'follow';
  if (notification.message.includes('trending')) return 'trending';
  return 'message';
};

export const extractAuthorName = (message: string): string => {
  // Extract name from messages like "John Doe liked your post"
  const match = message.match(/^(.*?)\s+(liked|commented|created|posted)/);
  return match ? match[1] : 'User';
};

export const getAvatarInitial = (name: string): string => {
  return name.charAt(0).toUpperCase();
};