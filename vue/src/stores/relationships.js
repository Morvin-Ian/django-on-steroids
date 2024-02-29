// store/relationships.js
import { defineStore } from 'pinia';
import { baseUrl } from './auth';

export const useRelationshipsStore = defineStore({
  id: 'relationships',
  actions: {
    async fetchRelationships(access_token) {
      try {
        const relationshipsUrl = `${baseUrl}/api/messages/chats/`;
        const response = await fetch(relationshipsUrl, {
          headers: { Authorization: `Bearer ${access_token}` },
        });

        if (!response.ok) {
          localStorage.clear();
          throw new Error('Failed to fetch relationships');
        }

        return await response.json();
      } catch (error) {
        console.error('Fetch relationships error:', error);
        return error.message;
      }
    },
  },
});
