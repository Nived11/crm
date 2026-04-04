import { useState, useEffect, useCallback } from 'react';
import api from '@/api/axios';
import { toast } from 'sonner';

export interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  is_read: boolean;
  is_replied: boolean;
  created_at: string;
}

export interface MessageDetail extends Message {
  phone: string;
  message: string;
  reply_message: string | null;
  replied_at: string | null;
}

export function useMessage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<MessageDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replying, setReplying] = useState(false);

  // 1. Get All Messages
  const fetchMessages = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/contacts/admin/list/');
      setMessages(response.data);
    } catch (error) {
      toast.error("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // 2. Get Single Message Detail
  const handleSelectMessage = async (id: number) => {
    setDetailLoading(true);
    setReplyText(''); // Clear previous reply text
    
    // Optimistically mark as read in the list view so the green dot disappears instantly
    setMessages(prev => prev.map(msg => msg.id === id ? { ...msg, is_read: true } : msg));

    try {
      const response = await api.get(`/contacts/admin/Detail/${id}/`);
      setSelectedMessage(response.data);
    } catch (error) {
      toast.error("Failed to fetch message details");
    } finally {
      setDetailLoading(false);
    }
  };

  // 3. Send Reply
  const handleSendReply = async (id: number) => {
    if (!replyText.trim()) {
      toast.error("Please enter a reply message");
      return;
    }
    
    setReplying(true);
    try {
      const response = await api.post(`/contacts/admin/${id}/reply/`, {
        reply_text: replyText
      });
      
      if (response.status === 200) {
        toast.success("Professional Email sent successfully!");
        
        // Update local state to show it's replied
        setSelectedMessage(prev => prev ? { 
          ...prev, 
          is_replied: true, 
          reply_message: replyText,
          replied_at: new Date().toISOString()
        } : null);
        
        // Update the list view
        setMessages(prev => prev.map(msg => msg.id === id ? { ...msg, is_replied: true } : msg));
        setReplyText('');
      }
    } catch (error) {
      toast.error("Failed to send reply");
    } finally {
      setReplying(false);
    }
  };

  return {
    messages,
    loading,
    selectedMessage,
    detailLoading,
    replyText,
    setReplyText,
    replying,
    handleSelectMessage,
    handleSendReply,
    setSelectedMessage // To close the detail view on mobile
  };
}