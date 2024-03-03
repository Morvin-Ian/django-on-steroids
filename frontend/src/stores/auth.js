// store/auth.js
import { defineStore } from "pinia";
export const baseUrl = "http://127.0.0.1:8000/api/messages";
export const authUrl = "http://127.0.0.1:8000/api/auth";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    uuid: null
  }),
  actions: {
    async authenticate(credentials) {
      try {
        const response = await fetch(`${authUrl}/login/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
          return data;
        } else {
          localStorage.setItem("user",JSON.stringify(data))
          return data;

        }
      } catch (error) {
        return error;
      }
    },
    async registration(credentials) {
      try {
        const response = await fetch(`${authUrl}/register/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
          return data
        }else{
          return data
        }
      } catch (error) {
        return error
      }
    },
  },
});
