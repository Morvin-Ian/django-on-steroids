<template>
    <form class="input-form" @submit.prevent="handleSubmit">
        <div class="emojis">
            <font-awesome-icon :icon="['fas', 'face-smile']" />
        </div>
        <div class="files">
            <FileDropDown 
                :class="viewFileMessage ? 'drop': 'none'"
            />
            <font-awesome-icon 
                @click="setFileMessage" 
                :class="!viewFileMessage ? 'icon': 'icon-ratate'" 
                icon="plus" 
            />
        </div>
        
        <div class="text-message">
            <input type="text" class="text"/>
        </div>

        <div class="voice-note">
            <font-awesome-icon :icon="['fas', 'microphone']" />
        </div>
    </form>
</template>

<script setup>
    import FileDropDown from "@/components/dropdowns/FileMessageDropDown.vue"
    import {defineEmits, defineProps} from "vue"

    const emits = defineEmits(['view-file-message'])

    const props = defineProps({
        viewFileMessage:{
            type:Boolean,
            required:true
        }

    })

    const setFileMessage = () => {
        emits('view-file-message', !props.viewFileMessage)
    }

    const handleSubmit = () => {

    }
</script>

<style scoped>
    .input-form {
        display: flex;
        justify-content: space-evenly;
        padding: 10px;
    }

    .text-message{
        flex-basis: 85%;
    }

    .text-message input{
        width: 100%;
        background-color: #141c20;
        padding: 10px;
        border-radius: 5px;
        border: none;
        color: #b6b6b6;

    }

    .files, .emojis, .voice-note{
        cursor:pointer;
        color: #b6b6b6;
        padding: 5px;

    }

    .voice-note{
        margin-left:25px;
    }

    .drop{
        display: block;
    }

    .none{
        display: none;
    }

    .icon{
        transition: transform 0.7s ease;
        padding: 5px;
    }
    .icon-ratate{
        transition: transform 0.7s ease;
        transform: rotate(45deg);
        border-radius: 50%;
        padding: 5px;
        background-color: #141c20;
    }
</style>