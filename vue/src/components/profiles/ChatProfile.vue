<template>
    <div :class="viewChatProfile ? 'profile-container' : 'profile-hidden'">
        <div class="top">
            <div class="arrow">
                <font-awesome-icon @click="hideProfile" icon="circle-xmark" />
            </div>
            <div class="title">
                <span>Contact Info</span>
            </div>
        </div>

        <div class="edit-profile">
            <div class="profile-image">
                <img :src="profilePicture" />
                <h2 style="text-align: center;">{{ activeChatStore.activeChat.username }}</h2>
            </div>

            <div class="about">

                <small class="title">About</small> <br>
                <small>Discipline, Competence, and Order</small>

            </div>

            <div class="media-links">
                <small>Media, Links, and Docs</small>
            </div>

            <div class="handle-chats">
                <ul>
                    <li>
                        <font-awesome-icon class="icon" icon="star" />
                        Starred messages
                    </li>
                    <li>
                        <font-awesome-icon class="icon" icon="bell" />
                        Mute notifications
                    </li>
                    <li>
                        <font-awesome-icon class="icon" icon="arrow-rotate-right" />
                        Dissapearing messages
                    </li>

                    <li>
                        <font-awesome-icon class="icon" icon="lock" />
                        Encryption <br>
                        <small style="margin-left: 17%;">Messages are end-to-end enctyped</small>
                    </li>

                   <div class="danger">
                    <li>
                        <font-awesome-icon class="icon" icon="ban" />
                        Block Sane
                    </li>
                    <li>
                        <font-awesome-icon class="icon" icon="thumbs-down" />
                        Report Sane
                    </li>
                    <li>
                        <font-awesome-icon class="icon" icon="trash" />
                        Delete Chat
                    </li>
                   </div>
                </ul>


            </div>

        </div>

    </div>
</template>

<script setup>
import profilePicture from "@/assets/default.jpg"
import { defineProps, defineEmits } from 'vue';

import {useActiveChatStore} from "@/stores/activeChat.js"


const emits = defineEmits(['view-chat-profile'])
const activeChatStore = useActiveChatStore();


const props = defineProps({
    viewChatProfile: {
        type: Boolean,
        required: true
    }
})

const hideProfile = () => {
    emits('view-chat-profile', false)
}

</script>

<style scoped>
.profile-container {
    position: absolute;
    top: 0%;
    right: 0%;
    color: #b6b6b6;
    background: #202C33;
    width: 25%;
    height: 105vh;
    justify-content: center;
    visibility: visible;
    overflow-y: scroll;
    transition: opacity 0.5s ease, max-height 0.7s ease, visibility 0.5s ease;
}

.profile-hidden {

    opacity: 0;
    max-height: 0;
    visibility: hidden;

}

.profile-container .top {
    display: flex;
    background-color: #141c20;
    padding: 20px;

}

.top .arrow {
    cursor: pointer;
    font-size: large;
}

.top .title {
    margin-left: 20%;
}

.profile-image {
    padding: 25px;
}


.profile-image img {
    border-radius: 50%;
    width: 260px;
    height: 260px;
    cursor: pointer;
    transition: width 0.5s ease, height 0.5s ease;

}

.profile-image img:hover {
    border-radius: 50%;
    width: 255px;
    height: 255px;

}

#profile {
    display: none;
}

.about {
    background-color: #141c20;
    padding: 15px;
    margin-bottom: 10px;
}

.about .title {
    color: gray;
}

.media-links {
    background-color: #141c20;
    padding: 15px;
    margin-bottom: 15px;

}

.handle-chats {
    background-color: #141c20;
    padding: 10px;
    margin-bottom: 10px;


}

.handle-chats ul {
    padding: 10px;
}

ul li {
    list-style: none;
    padding: 10px;
    cursor: pointer;
}

.handle-chats .icon {
    margin-right: 10%;
}

.danger{
    margin-top:40px;
}

.handle-chats .danger .icon{
    margin-right: 10%;
    color: red;
}

.more {
    background-color: #141c20;
    padding: 10px;
    margin-bottom: 30px;
}
</style>