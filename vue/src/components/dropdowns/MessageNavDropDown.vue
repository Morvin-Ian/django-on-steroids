<template>
    <ul class="drop-list">
        <li>Contact Info</li>
        <li>Select messages</li>
        <li>Close chat</li>
        <li>Mute notification</li>
        <li>Dissapearing messages</li>
        <li>Clear chat</li>
        <li>Delete chat</li>
        <li>Report</li>
        <li>Block</li>
    </ul>
</template>

<script>
</script>

<style scoped>
    .drop-list{
        position: absolute;
        top:8%;
        right:3%;
        background: #202C33;
        padding:5px;
        width: 20%;

    }

    .drop-list-no{
        visibility: hidden;

    }

    .drop-list li{
        color: #b6b6b6;
        margin-top:10px;
        list-style: none;
        cursor:pointer;
        padding:5px 20px;

    }
    .drop-list li:hover{
        background-color: #0d161b;
    }
</style>