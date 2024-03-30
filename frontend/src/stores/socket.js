import { defineStore } from "pinia";

export const useSocketStore = defineStore("socket", {
    state: () => {
        return{
            socket: [],
        };
    },

    actions: {
        async setSocket(){
            try {
                this.socket =  new WebSocket(`ws://127.0.0.1:8000/ws/chat/brace/`)
                
            }catch (error) {
                console.error("Error setting Socket", error);
            }
        },   
    }
});
