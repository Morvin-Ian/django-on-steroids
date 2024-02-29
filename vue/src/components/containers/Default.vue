<template>
    <div class="page-container">
      <div class="content">
        <div class="image">
            <img :src="img" alt="None">
        </div>
        <div class="title">
          <h2>Whatsapp Web</h2>
        </div>
        <div class="body">
          <p>Send and receive messages without keeping your phone online <br>Use device on up to 4 linked devices and 1 phone at the same time.</p>
        </div>
  
        <div class="low">
          <small>
            <font-awesome-icon class="icon" icon="lock" />
            Your personal messages are end-to-end encrypted
        </small>
        </div>
      </div>
    </div>
  </template>


<script setup>
    import img from "@/assets/Server-bro.png"
</script>
  
  
  <style>
  /* CSS for centering content */
  .page-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Set the height of the container to the full viewport height */
  }
  
  .content {
    color: #b6b6b6;
    text-align: center;
  }

  .content img{
    width: 400px;
    object-fit: cover;
  }
  </style>
  