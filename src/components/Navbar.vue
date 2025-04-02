<script setup lang="ts">
import {LogOut, User, LayoutDashboard,Monitor,Users,NotebookPen,Anvil} from 'lucide-vue-next';
import {RouterLink } from 'vue-router';
</script>

<template>
    <div class="navbar-container">
        <div class="navbar-buttons">
        <div class="navbar-logo">
            <img src="../assets/logo.svg" alt="Logo" class="logo" width="145px" height="55px"/>
        </div>
        <div class="navbar-user">
            <button class="btn btn-secondary">
                User <User color="white"/>
            </button>
        </div>
        <nav>
            <ul>
                 <li>
                    <RouterLink to="/" class="routes">
                        <button class="btn btn-primary">
                            <LayoutDashboard color="white"/>Dashboard</button>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/Monitoramento" class="routes">
                        <button class="btn btn-primary">
                            <Monitor color="white"/>Monitoramento
                        </button>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/Utilizadores" class="routes">
                        <button class="btn btn-primary">
                            <Users color="white"/>Utilizadores
                        </button>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/Auditorias" class="routes">
                        <button class="btn btn-primary">
                            <NotebookPen color="white"/>Auditorias
                        </button>
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/Materiais" class="routes">
                        <button class="btn btn-primary">
                            <Anvil color="white"/>Materiais
                        </button>
                    </RouterLink>
                </li>
            </ul>
        </nav>
        <div class="navbar-logout">
            <button id="logout" class="btn btn-primary">
                Sair
                <LogOut color="white"/>
            </button> 
        </div>
    </div>
    </div>
</template>

<style scoped>
    .navbar-container{
        position:static;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        background-color: #734414;
        height: 100vh;
        min-height: fit-content;
        max-height: 100dvh;
        min-width: 300px;
        width: 20dvw;
    }

    .navbar-buttons{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding-block: 2rem;

        background-color: #734414;
        height: 50rem;
        /* min-height: fit-content;
        max-height: 100dvh; */
        max-width: 350px;

    }

    .navbar-logo{
        display: flex;
        width: fit-content;
        height: fit-content;
        justify-content:center;
        align-items:center;
        flex-shrink: 0;
    }
    .navbar-user{
        width: 15rem;
    }

    ul{
        list-style: none;

        width: 15rem;
        
        display: flex;
        flex-direction: column;
        gap: 1.875rem;
        padding: 0;
    }

    li{
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .btn-primary{
        width: 100%;
        height: 3.5rem;

        background-color: rgba(217, 217, 217, 15%);
        border: none;
        display: flex;
        justify-content:baseline;
        padding-left: 12px;
        align-items: center;
        gap: 12px;

        font-family: Inter;
        font-size: 18px;
        font-weight: 600;
    }
    .btn-primary:active{
        padding-left: 10px; 

        background-color: rgba(217, 217, 217, 15%);
        border: 2px solid #d7d7d7;
        color: #fff;
    }

    .btn-secondary{
        width: 100%;
        height: 58px;

        background-color: rgba(217, 217, 217, 15%);
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px;

        font-family: Inter;
        font-size: 18px;
        font-weight: 600;
    }
    .btn-secondary:focus{
        background-color: rgba(217, 217, 217, 15%);
        cursor: default;
    }
    .btn-secondary:hover{
        background-color: rgba(217, 217, 217, 15%);
        cursor: default;
    }

    #logout{
        width:15rem;
        height: 3.5rem;
        background-color: rgba(217, 217, 217, 15%);
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px;

    }
    #logout:active{
        /* Button moving fix */
        height: calc(3.5rem - .5px);
        padding-left: 12px;

        background-color: rgba(217, 217, 217, 15%);
        border: 2px solid #d7d7d7;
        color: #fff;
    }

    .routes{
        text-decoration: none;
        width: 100%;
    }

    @media only screen and (min-width: 1024px) {
        .navbar-buttons{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        padding-block: 2rem;

        background-color: #734414;
        height: 50rem;
        max-height: 100dvh;
        /* min-height: fit-content;
        max-height: 100dvh; */
        max-width: 350px;

    }

    .navbar-logo{
        display: flex;
        width: fit-content;
        height: fit-content;
        justify-content:center;
        align-items:center;
       
    }
    .btn-primary{
        width: 100%;
        height: 3.5rem;

        background-color: rgba(217, 217, 217, 15%);
        border: none;
        display: flex;
        justify-content:baseline;
        padding-left: 12px;
        align-items: center;
        gap: 12px;

        font-family: Inter;
        font-size: 18px;
        font-weight: 600;
    }
    }
</style>