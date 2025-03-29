<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
import Estatistica from '../components/Estatistica.vue';
</script>

<template>
    <div class="dashboard-container">
        <Navbar />
        <div class="information-container">
            <Estatistica />
        </div>
    </div>
</template>

<style scoped>
    .dashboard-container{
        overflow: hidden;
        display: flex;
    }
    .information-container{
        display: flex;
        margin-left: 45px;
        margin-top: 55px;
    }
</style>