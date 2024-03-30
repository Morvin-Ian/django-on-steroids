<template>
    <div class="messages-container">
        <div class="message" v-for="message in messageStore.messages" :key="message.id">
            <Message :message="message" />
        </div>
    </div>
</template>

<script setup>
import Message from "@/components/messages/Message.vue"
import { useMessagesStore } from "@/stores/messages.js"
import { useChatStore } from "@/stores/chats";
import { useSocketStore } from "@/stores/socket";
import { onMounted, watch } from "vue";

const messageStore = useMessagesStore()
const socketStore = useSocketStore()
const chatStore = useChatStore()
const user = JSON.parse(localStorage.getItem("user"))
const emits = defineEmits(["typing"])

// fetch Messages
messageStore.fetchMessages(user.token)

watch(() => socketStore.socket, (newSocket, oldSocket) => {
    if (newSocket) {
        newSocket.onmessage = () => {
            chatStore.getChats(user.token);
            messageStore.fetchMessages(user.token);
        };

    }
});

onMounted(() => {
    socketStore.socket.onmessage = (response) => {
        const data = JSON.parse(response.data)
        if (!data.response.typing) {
            chatStore.getChats(user.token)
            messageStore.fetchMessages(user.token)
            emits("typing", data.response)

        } else {
            emits("typing", data.response)
        }

    }
})
</script>

<style scoped>
.messages-container {
    height: 80vh;
    margin-bottom: 5px;
    overflow: scroll;
    background: url('../../assets/bg.jpg');
}
</style>