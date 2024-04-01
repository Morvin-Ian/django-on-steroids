<template>
   <div>
    <MessageNav 
        @view-chat-profile="setChatProfile"
        @view-message-drop ="setMessageDrop"
        :viewChatProfile="viewChatProfile"  
        :viewMessageDrop="viewMessageDrop"
        :typing="typing"
        :sender="actionSender"
        :receiver="actionReceiver"

    />
    <MessageList @typing="handleTyping"/>
    <div class="preview">
        <ImagePreview @hide-preview="hidePreview" v-if="file" :file="file"/>
    </div>
    <MessageInput
        :viewFileMessage="viewFileMessage"
        @view-file-message="setFileMessage"
        @file="setFile"
     />
    <ChatProfile 
        :viewChatProfile="viewChatProfile"  
        @view-chat-profile="setChatProfile" 
    />
   </div>
</template>

<script setup>
    import {ref, defineEmits, onMounted} from "vue"
    import MessageNav from "@/components/messages/Navbar.vue"
    import MessageList from "@/components/messages/MessagesList.vue"
    import MessageInput from "@/components/messages/MessageInput.vue"
    import ChatProfile from "@/components/profiles/ChatProfile.vue"
    import ImagePreview from "@/components/popups/ImagePreview.vue"
    import { useMessagesStore } from "@/stores/messages"
    import { useActiveChatStore } from "@/stores/activeChat"
    import { useChatStore } from "@/stores/chats"
  

    const viewChatProfile = ref(false);
    const viewMessageDrop = ref(false);
    const viewFileMessage = ref(false);
    const file = ref(null)
    const typing = ref(false);
    const actionSender = ref(null);
    const actionReceiver = ref(null);
    const messageStore = useMessagesStore()
    const activeChatStore = useActiveChatStore()
    const chatStore = useChatStore()
    const user = JSON.parse(localStorage.getItem("user"))


    const emits = defineEmits(['view-chat-profile', 'typing'])

    const setChatProfile = (chatProfileState) => {
        viewChatProfile.value = chatProfileState
        emits('view-chat-profile', viewChatProfile)
    }

    const setFile = (data) => {
        file.value = data
    }

    const hidePreview = () =>{
        file.value = null
    }


    const setMessageDrop = (messageDropState) => {
      viewMessageDrop.value = messageDropState
    }  
  
    const setFileMessage = (messageFileState) => {
      viewFileMessage.value = messageFileState
    }  

    const handleTyping = (data) => {
        typing.value = data.typing
        actionSender.value = data.sender
        actionReceiver.value = data.receiver
        emits("typing", data)
    }

    onMounted(()=>{
        messageStore.updateMessageRead(user.token, activeChatStore.activeChat.dialog)
        messageStore.fetchMessages(user.token)
        chatStore.getChats(user.token)

    })

</script>

<style scoped>
    .preview{
        position: absolute;
        bottom: 85%;
        padding: 10px;
    }

</style>