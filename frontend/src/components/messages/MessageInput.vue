<template>
    <form class="input-form" @submit.prevent="handleSubmit">
        <div class="emojis">
            <font-awesome-icon :icon="['fas', 'face-smile']" />
        </div>
        <div class="files">
            <FileDropDown @hide-file-drop="setFileMessage" :class="viewFileMessage ? 'drop' : 'none'" />
            <font-awesome-icon @click="setFileMessage" :class="!viewFileMessage ? 'icon' : 'icon-ratate'" icon="plus" />
        </div>

        <div class="text-message">
            <input @keydown="handleKeyDown" @keyup="handleKeyUp" type="text" v-model="message" class="text" />
        </div>

        <div class="voice-note">
            <font-awesome-icon :icon="['fas', 'microphone']" />
        </div>
    </form>
</template>

<script setup>
import FileDropDown from "@/components/dropdowns/FileMessageDropDown.vue"
import { defineEmits, defineProps, ref } from "vue"
import { useSocketStore } from "@/stores/socket";
import { useActiveChatStore } from "@/stores/activeChat";
import { useMessagesStore } from "@/stores/messages";
import { useToast } from "vue-toastification";


const toast = useToast();
const emits = defineEmits(['view-file-message', 'file'])
const socketStore = useSocketStore()
const activeChatStore = useActiveChatStore()
const messagesStore = useMessagesStore()
const message = ref('')
const user = JSON.parse(localStorage.getItem('user'))

const props = defineProps({
    viewFileMessage: {
        type: Boolean,
        required: true
    }

})

const setFileMessage = (data) => {
    emits('view-file-message', !props.viewFileMessage)
    if (data instanceof File) {
        emits("file", data);

    }
}

const handleKeyDown = () => {
    if (user) {
        socketStore.socket.send(JSON.stringify({
            sender: user.uuid,
            receiver: activeChatStore.activeChat.chat_uuid,
            message: null,
            dialog: activeChatStore.activeChat.dialog,
            typing: true
        }))
    }
}

const handleKeyUp = () => {
    if (user) {
        socketStore.socket.send(JSON.stringify({
            sender: user.uuid,
            receiver: activeChatStore.activeChat.chat_uuid,
            message: null,
            dialog: activeChatStore.activeChat.dialog,
            typing: false
        }))
    }
}

const handleSubmit = async () => {

    if (messagesStore.file) {
      
        const response = await messagesStore.sendFile(
            user.token, messagesStore.file, user.uuid
        )
        console.log(user.token, messagesStore.file, user.uuid)


    } else {
        if (message.value) {
            socketStore.socket.send(JSON.stringify({
                sender: user.uuid,
                receiver: activeChatStore.activeChat.chat_uuid,
                message: message.value,
                dialog: activeChatStore.activeChat.dialog,
                file: None
            }))
        }else{
            toast.info("Can't send an empty message")
        }
    }

    message.value = ""
}
</script>

<style scoped>
.input-form {
    display: flex;
    justify-content: space-evenly;
    padding: 10px;
}

.text-message {
    flex-basis: 85%;
}

.text-message input {
    width: 100%;
    background-color: #141c20;
    padding: 10px;
    border-radius: 5px;
    border: none;
    color: #b6b6b6;

}

.files,
.emojis,
.voice-note {
    cursor: pointer;
    color: #b6b6b6;
    padding: 5px;

}

.voice-note {
    margin-left: 25px;
}

.drop {
    display: block;
}

.none {
    display: none;
}

.icon {
    transition: transform 0.7s ease;
    padding: 5px;
}

.icon-ratate {
    transition: transform 0.7s ease;
    transform: rotate(45deg);
    border-radius: 50%;
    padding: 5px;
    background-color: #141c20;
}
</style>