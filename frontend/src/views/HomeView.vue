<template>
    <div @click="resetRefs" class="container">
      <div class="chats">
        <ChatsContainer 
          @change-view="changeDefault"
        />
      </div>
  
      <div :class="viewChatProfile ? 'messages-profile': 'messages'">
        <div v-if="!isDefault">
          <MessagesContainer
              @view-chat-profile="changeView"
          />
        </div>
         <div v-else>
            <DefaultContainer />
        </div>
      </div>
    </div>
  </template>
  
  
  <script setup>
        import {ref} from 'vue'
        import ChatsContainer from "@/components/containers/ChatComponentsContainer.vue"
        import MessagesContainer from "@/components/containers/MessageComponentsContainer.vue"
        import DefaultContainer from "@/components/containers/Default.vue"

        const viewChatProfile = ref(false)
        const isDefault = ref(true)
  

        const changeView = () =>{
            viewChatProfile.value = !viewChatProfile.value
        }

        const changeDefault = (val) => {
          isDefault.value = val
        }

  </script>
  
  <style>

  .container{
    display: flex;
  }
  
  .container .chats{
    flex-basis: 25%;
    border-right:1px solid rgb(78, 78, 78) ;
   
  }
  
  .container .messages{
    flex-basis: 75%;
    transition: flex-basis 1s ease;
  }

  .container .messages-profile{
    flex-basis: 50%;
    transition: flex-basis 1s ease;

  }
  </style>
  