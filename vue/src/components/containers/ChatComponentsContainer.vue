<template>
    <Navbar  
        @view-profile="setProfile" 
        @view-chat-drop="setChatDrop" 
        :viewChatDrop="viewChatDrop"
    />
    <Search/>
    <ChatList 
        @change-view="changeView"
    />
    <Profile 
        :viewProfile="viewProfile" 
        @view-profile="setProfile" 
    />
</template>

<script setup>
    import {ref, defineEmits} from "vue"
    import Navbar from "@/components/chats/Navbar.vue"
    import Search from "@/components/chats/Search.vue"
    import ChatList from "@/components/chats/ChatsList.vue"
    import Profile from "@/components/profiles/UserProfile.vue"


    const viewProfile = ref(false);
    const viewChatDrop = ref(false);

    const emits = defineEmits(['change-view'])
      
    const setProfile = (profileState) => {
      viewProfile.value = profileState
    }
  

    const setChatDrop = (chatDropState) => {
      viewChatDrop.value = chatDropState
    }  

    const changeView = (isDefault) => {
        emits('change-view', false)
    }
  

</script>