export interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: 'user' | 'contact' | 'ai';
  type: 'text' | 'voice' | 'image';
  status: 'sent' | 'delivered' | 'read';
  encrypted?: boolean;
  mediaUrl?: string;
}

export interface Contact {
  id: number;
  name: string;
  avatar: string;
  bio?: string;
  status?: string;
  lastSeen?: string;
  isVerified?: boolean;
  online?: boolean;
}