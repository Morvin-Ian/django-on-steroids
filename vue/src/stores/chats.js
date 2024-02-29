import { defineStore } from "pinia";
import { v4 as uuid } from "uuid";

export const BASE_URL = "http://localhost:5000";

export const useChatStore = defineStore("chats", {
    state: () => {
        return{
         chats: [],
        };
    },

    actions: {
        async getChats(){
            try {
                          
                const response = await fetch(`${BASE_URL}/chats`);
                const data = await response.json();
                
                this.chats = data;
                
            }catch (error) {
                console.error("Error fetching chats:", error);
            }
        },
        addChat(chat) {
            this.chats.unshift({
                id: uuid(),
                ...chat,
            });
        },
        deleteChat(id) {
            this.chats = this.chats.filter((chat) => chat.id !== id);
        },
        
    },

    getters: {
        sortedChats() {
            return this.chats?.sort(
                (a, b) => new Date(b.date) - new Date(a.date)
            );
        },
        getUser(){
            return this.chats.filter((chat) => chat.id === 1);

        }
    },
});
