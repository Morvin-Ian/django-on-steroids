<template>
  <div @click="resetRefs" class="container">
    <div class="chats">
      <ChatsContainer :typing="typing" :sender="sender" :receiver="receiver" @change-view="changeDefault" />
    </div>

    <div :class="viewChatProfile ? 'messages-profile' : 'messages'">
      <div v-if="!isDefault">
        <MessagesContainer @typing="handleTyping"  @view-chat-profile="changeView" />
      </div>
      <div v-else>
        <DefaultContainer />
      </div>
    </div>
  </div>
</template>


<script setup>
import { onMounted, ref } from 'vue'
import ChatsContainer from "@/components/containers/ChatComponentsContainer.vue"
import MessagesContainer from "@/components/containers/MessageComponentsContainer.vue"
import DefaultContainer from "@/components/containers/Default.vue"
import { useRouter } from 'vue-router'
import { useSocketStore } from '@/stores/socket'
import { useToast } from "vue-toastification";


const toast = useToast();
const router = useRouter()
const socketStore = useSocketStore()
const viewChatProfile = ref(false)
const isDefault = ref(true)
const typing = ref(false)
const sender = ref(null)
const receiver = ref(null)
const user = JSON.parse(localStorage.getItem("user"))


const changeView = () => {
  viewChatProfile.value = !viewChatProfile.value
}

const changeDefault = (val) => {
  isDefault.value = val
}

const handleTyping  = (data) => {
    typing.value = data.typing
    sender.value = data.sender
    receiver.value = data.receiver
}

onMounted(() => {
  if (!user || !user.token) {
    router.push('/sign-in')
    return
  }

  socketStore.setSocket()

socketStore.socket.onopen = () => {
  toast.success("Connection established!");
};


socketStore.socket.onclose = () => {
  toast.error("Connection Closed!");
};

})

</script>

<style>
.container {
  display: flex;
}

.container .chats {
  flex-basis: 25%;
  border-right: 1px solid rgb(78, 78, 78);

}

.container .messages {
  flex-basis: 75%;
  transition: flex-basis 1s ease;
}

.container .messages-profile {
  flex-basis: 50%;
  transition: flex-basis 1s ease;

}
</style>