<template>
    <MessageNav 
        @view-chat-profile="setChatProfile"
        @view-message-drop ="setMessageDrop"
        :viewChatProfile="viewChatProfile"  
        :viewMessageDrop="viewMessageDrop"
    />
    <MessageList/>
    <MessageInput
        :viewFileMessage="viewFileMessage"
        @view-file-message="setFileMessage"
     />
    <ChatProfile 
        :viewChatProfile="viewChatProfile"  
        @view-chat-profile="setChatProfile" 
    />
</template>

<script setup>
    import {ref, defineEmits} from "vue"
    import MessageNav from "@/components/messages/Navbar.vue"
    import MessageList from "@/components/messages/MessagesList.vue"
    import MessageInput from "@/components/messages/MessageInput.vue"
    import ChatProfile from "@/components/profiles/ChatProfile.vue"
  

    const viewChatProfile = ref(false);
    const viewMessageDrop = ref(false);
    const viewFileMessage = ref(false);

    const emits = defineEmits(['view-chat-profile'])

    const setChatProfile = (chatProfileState) => {
        viewChatProfile.value = chatProfileState
        emits('view-chat-profile', viewChatProfile)
    }


    const setMessageDrop = (messageDropState) => {
      viewMessageDrop.value = messageDropState
    }  
  
    const setFileMessage = (messageFileState) => {
      viewFileMessage.value = messageFileState
    }  

</script>