import { defineStore } from "pinia";
import { BASE_URL } from "./chats";


export const useMessagesStore = defineStore("messages", {

    state:() => {
        return{
            messages:[]
        }
    },

    actions:{
        async getMessages(){
            try {
                          
                const response = await fetch(`${BASE_URL}/messages`);
                const data = await response.json();
                
                this.messages = data;
                
            }catch (error) {
                console.error("Error fetching Messages:", error);
            }
        },

        addMessage(message){
            this.messages.push(message);
        },

        deleteMessages(id){
            this.messages = this.messages.filter((message)=>message.id !== id);
        }
    }

})