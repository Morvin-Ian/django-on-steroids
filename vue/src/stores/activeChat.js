import { defineStore } from "pinia";
import { BASE_URL } from "./chats";

export const useActiveChatStore = defineStore("activeChat", {
    state: () => {
        return{
            activeChat: [],
        };
    },

    actions: {
        async setChat(id){
            try {
                          
                const response = await fetch(`${BASE_URL}/chats/${id}`);
                const data = await response.json();

                this.activeChat = data;
                
            }catch (error) {
                console.error("Error fetching chat", error);
            }
        },   
    }
});
