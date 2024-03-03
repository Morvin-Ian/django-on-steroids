import { defineStore } from "pinia";
import { baseUrl } from "./auth";

export const useActiveChatStore = defineStore("activeChat", {
    state: () => {
        return{
            activeChat: [],
        };
    },

    actions: {
        async setChat(id){
            try {
                          
                const response = await fetch(`${baseUrl}/chats/${id}`);
                const data = await response.json();

                this.activeChat = data;
                
            }catch (error) {
                console.error("Error fetching chat", error);
            }
        },   
    }
});
