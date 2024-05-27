<template>
    <div class="nav-container">
        <div class="user-profile">
            <img @click="setProfile" :src="profilePicture" alt="profile">
        </div>

        <div class="nav-btns">
            <div class="community">
                <font-awesome-icon class="icon" :icon="['fas', 'users']" />
            </div>

            <div class="status">
                <font-awesome-icon class="icon" :icon="['fas', 'circle']" />
            </div>

            <div class="add-chat">
                <font-awesome-icon class="icon" :icon="['fas', 'square-plus']" />
            </div>

            <div class="more">
                <font-awesome-icon @click="setDropDown" class="icon" id="more" :icon="['fas', 'ellipsis-vertical']" />
            </div>
        </div>

        <div>
            <DropDown :class="viewChatDrop ? 'drop':'none'" />
        </div>

    </div>
</template>

<script setup>
    import profilePicture from "@/assets/octo.jpg"
    import DropDown from "@/components/dropdowns/ChatNavDropDown.vue"
    import {defineProps, defineEmits} from "vue"

    const emits = defineEmits(['view-profile', 'view-chat-drop'])


    const props = defineProps({
        viewChatDrop:{
            type:Boolean,
            required:true
        }
    })

    const setProfile = () => {
        emits('view-profile', true)
    }

    const setDropDown = () => {
        emits('view-chat-drop', !props.viewChatDrop)
    }

</script>

<style scoped>
.nav-container {
    display: flex;
    padding: 5px;
    border-radius: 4px;
    background-color: #141c20;

}

.user-profile img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
    flex-basis: 10%;
    padding: 5px;
}

.nav-btns{
    flex-basis: 80%;
    display: flex;
    justify-content: end;
    color: #b6b6b6;
    padding: 5px;
    margin-top: 10px;

}

.nav-btns div{
    margin-left: 15%;
}

.nav-btns .icon{
    padding: 5px;
    border-radius: 50%;
    transition: background-color 0.5s ease;
}

#more{
    border-radius: 0%;
}
.nav-btns div .icon{
    font-size: large;
    cursor: pointer;
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