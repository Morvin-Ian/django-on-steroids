<template>
    <ul class="drop-list">
        <li>
            <font-awesome-icon style="color:indigo"  icon="file" />
            Documents
        </li>
        <li>
            <font-awesome-icon style="color:blue"  icon="images" />
            Photos & Videos
        </li>
        <li>
            <font-awesome-icon style="color:rgb(221, 22, 55)"  icon="camera" />
            Camera
        </li>
        <li>
            <font-awesome-icon style="color:blue"  :icon="['fas', 'user']" />
            Contact
        </li>
        <li>
            <font-awesome-icon style="color:orangered" icon="square-poll-vertical" />
            Poll
        </li>
    </ul>
</template>

<script setup>

</script>

<style scoped>
    .drop-list{
        position: absolute;
        bottom:5%;
        border-radius:10px;
        left:30%;
        background: #202C33;
        padding:30px;
    }

    .drop-list-no{
        visibility: hidden;

    }

    .drop-list li{
        color: #b6b6b6;
        list-style: none;
        cursor:pointer;
        padding: 10px;
    }

    .drop-list li:hover{
        background-color: #111f27;

    }
</style>