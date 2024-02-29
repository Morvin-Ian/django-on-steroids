import { defineStore } from 'pinia';
import { baseUrl } from './auth';

export const useMessagesStore = defineStore({
  id: 'messages',
  actions: {
    async fetchMessages(access_token) {
      try {
        const messagesUrl = `${baseUrl}/api/messages/list/`;
        const response = await fetch(messagesUrl, {
          headers: { Authorization: `Bearer ${access_token}` },
        });

        if (!response.ok) {
          localStorage.clear();
          throw new Error('Failed to fetch messages');
        }

        return await response.json();
      } catch (error) {
        console.error('Fetch messages error:', error);
        return error.message;
      }
    },

    async updateMessageRead(access_token, dialog) {
      try {
        const messagesReadUrl = `${baseUrl}/api/messages/read/`;
        const response = await fetch(messagesReadUrl, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ dialog }),
        });

        if (!response.ok) {
          throw new Error('Failed to update message read status');
        }

        return 'Message read status updated successfully';
      } catch (error) {
        console.error('Update message read error:', error);
        return error.message;
      }
    },
  },
});
