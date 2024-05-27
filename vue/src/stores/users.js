// store/users.js
import { defineStore } from 'pinia';
import { baseUrl } from './auth';

export const useUsersStore = defineStore({
  id: 'users',
  actions: {
    async fetchUsers(access_token) {
      try {
        const usersApiUrl = `${baseUrl}/api/auth/users/`;
        const response = await fetch(usersApiUrl, {
          headers: { Authorization: `Bearer ${access_token}` },
        });

        if (!response.ok) {
          localStorage.clear();
          throw new Error('Failed to fetch users');
        }

        return await response.json();
      } catch (error) {
        console.error('Fetch users error:', error);
        return [];
      }
    },
  },
});
