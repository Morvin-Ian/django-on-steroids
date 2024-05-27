<template>
    <div class="chat-list">
        <div class="chat" v-for="chat in chatStore.sortedChats" :key="chat.id">
            <Chat :typing="typing" :sender="sender" :receiver="receiver" @click="setActiveChat(chat)" :chat="chat" />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import Chat from "@/components/chats/Chat.vue";
import { useChatStore } from "@/stores/chats.js"
import { useActiveChatStore } from "@/stores/activeChat.js"
import { useSocketStore } from "@/stores/socket";

const props = defineProps({
    typing: {
        type: Boolean,
        required: true
    },
    sender: {
        type: String,
        required: false
    },
    receiver: {
        type: String,
        required: false
    }
})

const chatStore = useChatStore();
const activeChatStore = useActiveChatStore();
const socketStore = useSocketStore();

const emits = defineEmits(['change-view'])
const user = JSON.parse(localStorage.getItem("user"))

const setActiveChat = (chat) => {
    activeChatStore.setChat(chat)
    emits('change-view', false)
}

onMounted(async () => {
    const response = await chatStore.getChats(user.token)
    if (response.status == 403) {
        localStorage.clear()
        window.location.assign("/sign-in")
    }
})




</script>

<style scoped>
.chat-list {
    margin-top: 5px;
    height: 85vh;
    overflow-y: scroll;
}
</style>