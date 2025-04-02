<script setup lang="ts">
</script>

<template>
    <div class="container">
        <div class="title">Estatística</div>
        <div class="container blocks">
            <div class="row">
                <div class="col-sm- block">
                    <div class="block-title">Profissionais Ativos</div>
                    <div class="block-value">0</div>
                </div>
                <div class="col-sm- block">
                    <div class="block-title">Áreas</div>
                    <div class="block-value">0</div>
                </div>
            </div>
            <div class="row">
                <div class="col-sm- block">
                    <div class="block-title">Ocorrências</div>
                    <div class="block-value">0</div>
                </div>
                <div class="col-sm- block">
                    <div class="block-title">Materias</div>
                    <div class="block-value">0</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .container{
        min-width: 335px;
        min-height: 154px;
        height: 444px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 18px;
        color: black;
        /* background-color: tomato; */
    }
    .title{
        font-family: 'Poppins', sans-serif;
        font-weight: 500;
        line-height: normal;
        font-size: 26px;
    }
    .blocks{
        /* background-color: aqua; */
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 39px;
        flex-shrink: 0;
    }
    .block{
        display: flex;
        flex-shrink: 0;
        flex-direction: column;
        justify-content: center;
        align-items: start;
        gap: 16px;
        width: 335px;
        height: 154px;

        border: 2px solid #000;
        border-radius: 10px;
        background: url(../assets/heropatterns.png) 50%;
        background-color: rgba(255, 255, 255, 0.5);
        background-blend-mode: lighten;
    }
    .block-title{
        padding-left: 18px;
        padding-top: 18px;
        padding-right: 42px;
        text-align: center;

        font-family: 'Sofia Sans', sans-serif;
        font-weight: 700;
        font-size: 28px;
        font-style: normal;
    }
    .block-value{
        padding-left: 40px;
        padding-bottom: 22px;

        /* text-align: center; */

        font-family: 'Poppins', sans-serif;
        font-weight: 700;
        font-size: 34px;
        font-style: normal;
    }
    .row{
        gap: 35px;
    }
</style>