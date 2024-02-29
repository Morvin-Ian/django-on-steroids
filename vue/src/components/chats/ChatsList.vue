<template>
    <div class="chat-list">
        <div class="chat" 
            v-for="chat in chatStore.sortedChats" 
            :key="chat.id">
                <Chat @click="setActiveChat(chat.id)" :chat="chat"/>
        </div>
    </div>
</template>

<script setup>
    import {defineEmits} from "vue"
    import Chat from "@/components/chats/Chat.vue";
    import {useChatStore} from "@/stores/chats.js"
    import {useActiveChatStore} from "@/stores/activeChat.js"

    const chatStore = useChatStore();
    const activeChatStore = useActiveChatStore();

    const emits = defineEmits(['change-view'])
    //fetch chats
    chatStore.getChats()

    const setActiveChat = (id) =>{
        activeChatStore.setChat(id)
        emits('change-view', false)
    }


    
</script>

<style scoped>
    .chat-list {
        margin-top: 5px; 
        height: 85vh;
        overflow-y: scroll;       
    }

</style>