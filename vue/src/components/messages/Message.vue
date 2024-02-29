<template>
    <div :class="userId !== message.senderId ? 'message-container-received' : 'message-container-sent'">
        <div class="message">
            <div class="message-body">
                <div :class="message.file ? 'file': 'no-file'">
                    <img :src="file" alt="file"/>
                </div>

                <div class="text">
                    <span>{{ message.message }}</span> 
                    <font-awesome-icon class="icon" :icon="['fas', 'chevron-down']" />
                    <br>
                    <small class="time">{{ message.time }}</small>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
    import file from "@/assets/octo.jpg"
    import {defineProps, computed} from "vue"
    import {useChatStore} from "@/stores/chats.js"

    const chatStore = useChatStore()

    const props =  defineProps({
        message:{
            type:Object,
            required:true,
        }
    }) 

    const userId = computed(()=>{
        return chatStore.getUser[0].id
    });
   
</script>

<style scoped>
.message-container-received {
    max-width: 80%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 10px;
}

.message-container-sent {
    display: flex;
    gap: 10px;
    margin: 10px;
    flex-direction: row-reverse;

}

.message-container-received .message{
    background: #202C33;
    color: #b6b6b6;
    padding: 10px;
    border-radius:0px 10px 10px 10px;
    max-width: max-content;
}

.message-container-sent .message{
    background-color: #075E54;
    color: #fff;
    padding: 10px;
    border-radius:0px 10px 10px 10px;
    max-width: max-content;
}

.file img{
    height: 250px;
    mn-width: 200px;
    border-radius: 5px;
    object-fit: cover;
    cursor: pointer;
}

.no-file{
    display: none;
}

.text .time{
    float: right;
    color: #b6b6b6;
}

.icon{
    cursor: pointer;
    float: right;
    visibility: hidden;
}

.message-container-sent .message:hover .icon,
.message-container-received .message:hover .icon{
    visibility: visible;
} 

</style>