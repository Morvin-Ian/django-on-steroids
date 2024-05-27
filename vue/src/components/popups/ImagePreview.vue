<template>
    <div class="image-upload">
        <div class="cancel">
            <font-awesome-icon class="icon" @click="hidePreview" icon="circle-xmark" />
        </div>

        <div v-if="isImage" class="preview-container">
            <img :src="previewUrl" alt="Image Preview">
        </div>

        <div v-if="isVideo" class="preview-container">
            <video controls :src="previewUrl" alt="Video Preview"></video>
        </div>

        <div v-if="noPreview" class="no-preview">
            <font-awesome-icon style="font-size: xx-large;" icon="file" /> <br>
            <p>{{ file.name }} - {{ (file.size/1000).toFixed(1)}} KB</p>
        </div>
    </div>
</template>


<script setup>
import { defineProps, watch, ref, onMounted, defineEmits } from 'vue';
import { useMessagesStore } from '@/stores/messages';

const previewUrl = ref(null);
const noPreview = ref(false);
const isVideo = ref(false);
const isImage = ref(false);
const messageStore = useMessagesStore();
const props = defineProps({
    file: {
        type: File,
        required: false
    }
});

const emits = defineEmits(["hide-preview"]);

const previewMedia = () => {
    const file = props.file;
    if (!file) {
        noPreview.value = true;
    }

    else if (file.type === "application/msword" || file.type === "application/pdf") {
        noPreview.value = true;
    }

    else if (file.type.startsWith("video/")) {
        isVideo.value = true;
        previewUrl.value = URL.createObjectURL(file);
    }

    else {
        isImage.value = true;
        const reader = new FileReader();
        reader.onload = (e) => {
            previewUrl.value = reader.result;
        };
        reader.readAsDataURL(file);
    }
};

const hidePreview = () => {
    previewUrl.value = null;
    messageStore.file = null;
    emits("hide-preview");
};

watch(() => props.file, () => {
    previewMedia();
});

onMounted(() => {
    previewMedia();
});
</script>




<style scoped>
.image-upload {
    position: fixed;
    width: 70%;
    height: 70%;
    background: #202C33;
    color: #ddd;
    padding: 20px;
    border-radius: 10px;
}


.preview-container img,
video {
    position: absolute;
    width: 95%;
    height: 90%;
    object-fit: cover;
    border-radius: 10px;
    margin-top: 20px;


}

.icon {
    cursor: pointer;
    float: right;
}

.no-preview {
    text-align: center;
    margin-top: 20%;
    font-size: large;
}
</style>