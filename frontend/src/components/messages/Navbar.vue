<template>
    <div class="nav-container">
        <div class="user-profile">
            <img @click="setChatProfile" :src="profilePicture" alt="profile">
            <div class="name">
                <span >{{ activeChatStore.activeChat.username }}</span> <br>
                <small class="action">typing ...</small>
            </div>
        </div>

        <div class="nav-btns">

            <div class="voice">
                <font-awesome-icon class="icon"  :icon="['fas', 'square-phone']" />
            </div>

            <div class="video">
                <font-awesome-icon class="icon"  :icon="['fas', 'video']" />
            </div>

            <div class="search">
                <font-awesome-icon class="icon"  :icon="['fas', 'magnifying-glass']" />         
            </div>

            <div class="more">
                <font-awesome-icon @click="setDropDown" class="icon" id="more" :icon="['fas', 'ellipsis-vertical']" />
            </div>

        </div>

        <div>
            <DropDown :class="viewMessageDrop ? 'drop':'none'" />
        </div>

    </div>
</template>viewMessageDrop

<script setup>
    import profilePicture from "@/assets/octo.jpg"
    import DropDown from "@/components/dropdowns/MessageNavDropDown.vue"

    import {useActiveChatStore} from "@/stores/activeChat.js"
    import {defineEmits, defineProps} from "vue"

    const activeChatStore = useActiveChatStore();
    const emits = defineEmits(['view-chat-profile', 'view-message-drop'])

    const props = defineProps({
        viewChatProfile:{
            type:Boolean,
            required:true
        },
        viewMessageDrop:{
            type:Boolean,
            required:true
        }

    })


    const setChatProfile = () => {
        emits('view-chat-profile', !props.viewChatProfile)
    }

    const setDropDown = () => {
        emits('view-message-drop', !props.viewMessageDrop) 
    }

</script>

<style scoped>
.nav-container {
    display: flex;
    padding: 5px;
    background-color: #141c20;

}

.user-profile{
    display: flex;
    color: #fff;
}

.user-profile .name{
    margin-top: 10px;
    font-weight: bold;
}

.user-profile .action{
    color: gray;
}
.user-profile img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
    flex-basis: 10%;
    padding: 5px;
}

.nav-btns{
    flex-basis: 80%;
    display: flex;
    justify-content: flex-end;
    color: #b6b6b6;
    padding: 5px;
    margin-top: 10px;

}

.nav-btns div{
    margin-left: 5%;
}

.nav-btns .icon{
    font-size: large;
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    transition: background-color 0.5s ease;

}

#more{
    border-radius: 0%;
}
.nav-btns .icon:hover{
    background-color: rgba(65, 65, 65, 0.749);

}

.drop{
        display: block;
    }
.none{
        display: none;
    }
</style>