// store/auth.js
import { defineStore } from "pinia";
export const baseUrl = "http://127.0.0.1:5000";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    access_token: null,
    uuid: null,
    profile: null,
    email: null,
    username: null,
    error: null,
  }),
  actions: {
    async authenticate(credentials) {
      try {
        const response = await fetch(loginUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
          this.error = data;
        } else {
          this.access_token = data.token;
          this.uuid = data.uuid;
          this.profile = data.profile;
          this.email = data.email;
          this.username = data.username;
        }
      } catch (error) {
        this.error = error.message;
      }
    },
    async registration(credentials) {
      try {
        const response = await fetch(registrationUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        if (!response.ok) {
          const data = await response.json();
          this.error = "Username or Email Already Exists";
        }
      } catch (error) {
        this.error = error.message;
      }
    },
  },
});
