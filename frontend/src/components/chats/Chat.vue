<template>
    <div class="chat-container">
        <div class="chat-profile">
            <img :src="chat.profile ? profilePicture : defaultProfile" alt="profile" />
        </div>

        <div class="chat-details">
            <div>
                <span class="name">{{ chat.chat }}</span> <br>
                <div class="low">
                    <small class="last-msg">{{ truncateText(chat.last_message) }}</small>
                    <font-awesome-icon class="icon" :icon="['fas', 'chevron-down']" />
                </div>
            </div>
        </div>

        <div class="last-seen">
            <small v-if="chat.date">{{ formatDateTime(chat.date).time }}</small>
            <small v-else>New Chat</small>

        </div>
    </div>
</template>

<script setup>
import profilePicture from "@/assets/octo.jpg"
import defaultProfile from "@/assets/default.jpg"
import { defineProps } from "vue"


const props = defineProps({
    chat: {
        type: Object,
        required: true,
    }
})

const truncateText = (text) => {
    if (!text) {
        return "Start conversation"
    } else {
        return text.length > 20 ? text.substring(0, 20) + " ..." : text;
    }
}

function formatDateTime(date) {
    const currentDate = new Date(date);
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let meridiem = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    const formattedTime = hours + ':' + minutes  + ' ' + meridiem;

    const formattedDate = currentDate.getFullYear() + '-' + ('0' + (currentDate.getMonth() + 1)).slice(-2) + '-' + ('0' + currentDate.getDate()).slice(-2);

    return {
        date: formattedDate,
        time: formattedTime
    };
}


</script>

<style scoped>
.chat-container {
    display: flex;
    justify-content: space-around;
    padding: 5px;
    background-color: #141c20;
    ;
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
    margin-left: 55px;
    visibility: hidden;
    font-size: small;
    float: right;
}

.chat-container:hover .low .icon {
    visibility: visible;
}
</style>