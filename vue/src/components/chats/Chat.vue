<template>
    <div class="chat-container">
        <div class="chat-profile">
            <img :src="chat.profile ? profilePicture : defaultProfile" alt="profile" />
        </div>

        <div class="chat-details">
            <div>
                <span class="name">{{ chat.chat }}</span> <br>
                <div class="low">
                    <small v-if="typing && sender != user.uuid && sender == chat.chat_uuid && receiver == user.uuid"
                        class="last-msg">
                        <span style="color: rgb(37, 211, 102);">typing...</span>
                    </small>

                    <small v-else class="last-msg">{{ truncateText(chat.last_message) }} </small>
                    <!-- <small v-if="chat.unread_count != 0" class="unread">{{ chat.unread_count }}</small> -->

                    <!-- <font-awesome-icon class="icon" :icon="['fas', 'chevron-down']" /> -->
                </div>
            </div>
        </div>

        <div class="last-seen">
            <small v-if="chat.date">{{ formatDateTime(chat.date).date }}</small>
            <small v-else>New Chat</small>

        </div>
    </div>
</template>

<script setup>
import profilePicture from "@/assets/octo.jpg"
import defaultProfile from "@/assets/default.jpg"
import { defineProps } from "vue"
import { formatDateTime } from "@/utils/helpers";


const props = defineProps({
    chat: {
        type: Object,
        required: true,
    },
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

const user = JSON.parse(localStorage.getItem("user"))

const truncateText = (text) => {
    if (!text) {
        return "Start conversation"
    } else {
        return text.length > 20 ? text.substring(0, 20) + " ..." : text;
    }
}


</script>

<style scoped>
.chat-container {
    display: flex;
    justify-content: space-around;
    padding: 5px;
    background-color: #141c20;
    border-bottom: 1px solid rgb(78, 78, 78);
}

.chat-container:hover {
    background-color: #202C33;
    cursor: pointer;
}

.chat-container .last-seen {
    color: #b6b6b6;
    /* color: #25D366; */

}

.unread {
    position: absolute;
    left: 23%;
    background: rgb(37, 211, 102);
    color: #141c20;
    padding: 5px;
    border-radius: 50%;
    font-size: x-small;
    font-weight: bolder;
}

.chat-profile {
    flex-basis: 10%;
}

.chat-profile img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    flex-basis: 10%;
    padding: 5px;
}

.chat-details {
    display: flex;
    flex-basis: 60%;
    padding: 5px;
    color: #b6b6b6;
}

.chat-details .name {
    color: #fff;
    font-weight: bolder;
}

/* .low{
        display: flex;
    } */

.low .icon {
    left: 25%;
    position: absolute;
    visibility: hidden;
    font-size: small;
    float: right;
}

.chat-container:hover .low .icon {
    visibility: visible;
}
</style>