<template>
    <div class="search-container">
        <div class="search">
            <input type="search" name="search" placeholder="Search ..." />
        </div>

        <div class="filter">
            <font-awesome-icon :icon="['fas', 'sort']" />
        </div>
    </div>
</template>

<script>
</script>

<style scoped>
    .search-container {
        display: flex;
        justify-content: space-evenly;
        margin-top: 5px;
        
    }

    .search-container .search{
        flex-basis: 90%;

    }

    .search-container .search input{
        border-radius: 8px;
        padding:10px;
        border: none;
        background-color: #141c20;
        color: #b6b6b6;
        width: 100%;
        padding-left: 15%;

    }

    .search-container .search input:focus{
        border: none;
        background-color: #1f2b31;
    }

    .search-container .filter{
        color: #b6b6b6;
        cursor: pointer;

    }

</style>