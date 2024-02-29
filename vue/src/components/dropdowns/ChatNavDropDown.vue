<template>
    <ul class="drop-list">
        <li>New group</li>
        <li>New community</li>
        <li>Starred messages</li>
        <li>Clear chats</li>
        <li>Select chat</li>
        <li>Settings</li>
        <li>Log out</li>
    </ul>
</template>

<script>

</script>

<style scoped>
    .drop-list{
        position: absolute;
        top:8%;
        left:5%;
        background: #202C33;
        width: 15%;
        padding: 5px 20px;

    }

    .drop-list li{
        color: #b6b6b6;
        margin-top:10px;
        list-style: none;
        cursor:pointer;
        padding: 5px;

    }

    .drop-list li:hover{
        background-color: #0d161b;
    }
</style>