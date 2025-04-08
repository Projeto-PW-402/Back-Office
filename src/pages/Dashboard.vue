<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
import Estatistica from '../components/Estatistica.vue';
import ChartAuditorias from '../components/ChartAuditorias.vue';
</script>

<template>
    <div class="dashboard-container">
        <Navbar />
        <div class="container information-container">
            <div class="row">
                <Estatistica id="estatistica" class="col-sm-"/>
            </div>
            <div class="row">
                <ChartAuditorias id="chart-auditorias" class="col-m-"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .dashboard-container{
        overflow-x: hidden;
        display: flex;
    }
    .information-container{
        display: flex;
        margin-left: 45px;
        margin-top: 55px;
    }
    /* #chart-auditorias{
        background-color: aliceblue;
        transform: scale(1);
        margin-left: 15rem;
        margin-top: 10rem;
    } */
</style>