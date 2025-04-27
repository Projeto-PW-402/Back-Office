<script setup lang="ts">

</script>
<template>
    <div class="main-container">
        <form>
            <label for="name">Nome</label>
            <input type="text" placeholder="" />
            <label for="name">Morada</label>
            <input type="text" placeholder="" />
            <label for="name">Email</label>
            <input type="email" placeholder="" />
        </form>
    </div>
</template>
<style scoped>
.main-container {
    position: absolute;
    top: calc(50% - 250px);
    left: calc(50% - 50px);
    width: 500px;
    height: 500px;
    background-color: red;
}
</style>