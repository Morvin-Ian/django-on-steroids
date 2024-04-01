<template>
  <ul class="drop-list">
    <li v-for="(item, index) in items" :key="index">
      <font-awesome-icon :style="{ color: item.color }" :icon="item.icon" />
      <label style="margin-left: 5px;" for="file">{{ item.text }}</label>
      <input type="file" id="file" ref="fileInput" style="display: none" @change="handleFileChange"
        :accept="item.accept" />
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue'
import { useMessagesStore } from "@/stores/messages";


const emits = defineEmits(["hide-file-drop"])
const messageStore = useMessagesStore()

const items = ref([
  { icon: "file", text: "Documents", color: "blue", accept:".doc,.docx,.pdf,application/msword,application/pdf" },
  { icon: "images", text: "Photos & Videos", color: "red", accept:"image/*,video/*"},
]);



const handleFileChange = (event) => {
  const file = event.target.files[0];
  messageStore.setFile(file)
  emits("hide-file-drop", file)
  
};
</script>



<style scoped>
.drop-list {
  position: absolute;
  bottom: 5%;
  border-radius: 10px;
  left: 30%;
  background: #202C33;
  padding: 30px;
}

.drop-list-no {
  visibility: hidden;

}

label {
  cursor: pointer;

}

.drop-list li {
  color: #b6b6b6;
  list-style: none;
  cursor: pointer;
  padding: 10px;
}

.drop-list li:hover {
  background-color: #111f27;

}
</style>