<template>
    <div class="chat-list">
        <div class="chat" 
            v-for="chat in chatStore.chats" 
            :key="chat.id">
                <Chat @click="setActiveChat(chat)" :chat="chat"/>
        </div>
    </div>
</template>

<script setup>
    import { onMounted} from "vue"
    import Chat from "@/components/chats/Chat.vue";
    import {useChatStore} from "@/stores/chats.js"
    import {useActiveChatStore} from "@/stores/activeChat.js"
    

    const chatStore = useChatStore();
    const activeChatStore = useActiveChatStore();

    const emits = defineEmits(['change-view'])
    const user = JSON.parse(localStorage.getItem("user"))


    const setActiveChat = (chat) =>{
        activeChatStore.setChat(chat)
        emits('change-view', false)
    }

    onMounted( async ()=>{
        await chatStore.getChats(user.token)
    })



    
</script>

<style scoped>
    .chat-list {
        margin-top: 5px; 
        height: 85vh;
        overflow-y: scroll;       
    }

</style>