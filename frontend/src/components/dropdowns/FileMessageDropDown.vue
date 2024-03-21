<template>
    <ul class="drop-list">
      <li v-for="(item, index) in items" :key="index" @click="openFileInput(item)">
        <font-awesome-icon :style="{ color: item.color }" :icon="item.icon" />
        <label style="margin-left: 5px;" for="file">{{ item.text }}</label>
        <input type="file" id="file" ref="fileInput" style="display: none" @change="handleFileChange" />
      </li>
    </ul>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const items = ref([
    { icon: "file", text: "Documents", color: "indigo", type: "documents" },
    { icon: "images", text: "Photos & Videos", color: "blue", type: "photos" },
    { icon: "camera", text: "Camera", color: "rgb(221, 22, 55)", type: "camera" },
    { icon: ["fas", "user"], text: "Contact", color: "blue", type: "contact" },
    { icon: "square-poll-vertical", text: "Poll", color: "orangered", type: "poll" }
  ]);
  
  const openFileInput = (item) => {
    const fileInput = item.type === "documents" ? "doc" :
                      item.type === "photos" ? "photo" :
                      item.type === "camera" ? "cam":
                      item.type === "contact" ? "contact" :
                      item.type === "poll" ? "poll":
                      null;
    if (fileInput) {
        console.log(fileInput)
    }
  };
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Handle the file according to your application logic
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
label{
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