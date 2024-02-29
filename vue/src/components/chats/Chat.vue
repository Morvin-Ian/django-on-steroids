<template>
    <div class="chat-container">
        <div class="chat-profile">
            <img 
                :src="chat.profile ? profilePicture: defaultProfile" 
                alt="profile"
            />
        </div>

        <div class="chat-details">
            <div>
                <span class="name">{{ chat.username }}</span> <br>
                <div class="low">
                    <small class="last-msg">{{ truncateText(chat.last_message) }}</small>
                    <font-awesome-icon class="icon" :icon="['fas', 'chevron-down']" />
                </div>
            </div>
        </div>

        <div class="last-seen">
            <small>{{ chat.last_message_time }}</small>
        </div>
    </div>
</template>

<script setup>
    import profilePicture from "@/assets/octo.jpg"
    import defaultProfile from "@/assets/default.jpg"
    import {defineProps} from "vue"


    const props =  defineProps({
        chat:{
            type:Object,
            required:true,
        }
    }) 

    const truncateText = (text) => {
      return text.length > 20 ? text.substring(0, 20) + " ..." : text;
    }

</script>

<style scoped>
    .chat-container {
        display: flex;
        justify-content: space-around;
        padding: 5px;
        background-color: #141c20;;
        border-bottom: 1px solid rgb(78, 78, 78);
    }

    .chat-container:hover{
        background-color: #202C33;
        cursor: pointer;
    }
    .chat-container .last-seen{
        color: #b6b6b6;
        /* color: #25D366; */

    }
    .chat-profile{
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

    .chat-details{
        display: flex;
        flex-basis: 60%;
        padding: 5px;
        color: #b6b6b6;
    }

    .chat-details .name{
        color: #fff;
        font-weight: bolder;
    }

    /* .low{
        display: flex;
    } */

    .low .icon{
        margin-left: 55px;
        visibility: hidden;
        font-size: small;
        float: right;
    }

    .chat-container:hover .low .icon{
        visibility: visible;
    }


</style>