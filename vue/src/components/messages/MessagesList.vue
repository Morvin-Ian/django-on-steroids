<template>
    <div class="messages-container">
        <div class="message" v-for="message in messageStore.messages">
            <Message :message="message"/>
        </div>
    </div>

</template>

<script setup>
    import Message from "@/components/messages/Message.vue"
    import {useMessagesStore} from "@/stores/messages.js"

    const messageStore = useMessagesStore()

    // fetch Messages
    messageStore.getMessages()
    
</script>

<style scoped>
    .messages-container{
        height: 80vh;
        margin-bottom: 5px;
        overflow: scroll;
        background: url('../../assets/bg.jpg') ;
    }
</style>