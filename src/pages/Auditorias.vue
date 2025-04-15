<script setup lang="ts">
import Navbar from '../components/Navbar.vue'

</script>
<template>
    <div class="auditorias-container">
    <Navbar />
    <div class="frame">
    <nav>
            <div class="sub-navbar-container">
                <ul class="sub-navbar-list">
                    <li class="sub-navbar-elements"><div class="btn btn-warning sub-navbar-buttons">Pedidos</div></li>
                    <li class="sub-navbar-elements"><div class="btn btn-warning sub-navbar-buttons">Criar Auditoria</div></li>
                </ul>
            </div>
        </nav>
    <div class="container-fluid p-4 bg-light" id="table-container">
      <div class="table-responsive bg-white ">
        <table class="table table-hover mb-0">
          <thead class="text-center align-middle">
            <tr>
              <th scope="col">
                <input type="checkbox" class="form-check-input"/>
              </th>
              <th scope="col">Utilizador</th>
              <th scope="col">Local</th>
              <th scope="col">Data</th>
              <th scope="col">Ação</th>
            </tr>
          </thead>
          <!-- <tbody class="text-center align-middle">
            <tr v-for="(item, index) in materiais" :key="index">
              <td><input type="checkbox" /></td>
              <td>{{ item.nome }}</td>
              <td>
                <select class="form-select form-select-sm">
                  <option v-for="(tipo, i) in tipos" :key="i">{{ tipo }}</option>
                </select>
              </td>
              <td>{{ item.descricao }}</td>
              <td>{{ item.quantidade }}</td>
              <td>
                <button class="btn btn-sm btn-outline-danger me-1">
                  <i class="bi bi-trash"></i>
                </button>
                <button class="btn btn-sm btn-outline-warning">
                  <i class="bi bi-pencil"></i>
                </button>
              </td>
              <td>{{ item.preco }}</td>
            </tr>
          </tbody> -->
        </table>
      </div>
  
      <!-- Paginação -->
      <nav class="d-flex justify-content-center mt-4">
        <ul class="pagination pagination-sm mb-0">
          <li class="page-item disabled"><span class="page-link" id="prev">&lt;Prev</span></li>
          <li class="page-item active"><span class="page-link">1</span></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item"><a class="page-link" href="#">4</a></li>
          <li class="page-item"><a class="page-link" href="#" id = 'next'>Next&gt;</a></li>
        </ul>
      </nav>
  
      <!-- Botão Adicionar -->
      <div class="text-end mt-3">
        <button class="btn btn-warning" id="adicionar">Adicionar</button>
      </div>
    </div>
</div>
</div>
  </template>

<style scoped>
    .frame{
        width: 100%;
        max-height: 100dvh;
        display: flex;
        flex-direction: column;
    }
    .sub-navbar-container{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 125px;
        background-color: #825A32;
    }
    .sub-navbar-list{
        display: flex;
        gap: 500px;
        list-style:none;
    }
    .sub-navbar-buttons{
        display: flex;
        justify-content: center;
        align-items: center;

        width: 10rem;
        height: 3rem;

        font-family: Poppins, sans-serif;
        font-weight: 500;
        font-size: 16px;

        background-color: #D7A871;
    }
    .auditorias-container {
        display: flex;
    }
    #title{
        font-family: Poppins, sans-serif;
        font-weight: 600;
    }
    #table-container{
        max-height: calc(100dvh - 125px);
        height: 100%;
    }
    table{
        background: transparent;
        width: 100%;
    }
    tr{
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
    }
    th{
        background-color: #d7d7d7;
        border-radius: 0%;
        font-family: Poppins, sans-serif;
        font-weight: 500;
        margin-inline: 10px;
        width: 100%;
    }
    input[type="checkbox"]{
        width: 20px;
        height: 20px;
        border: 2px solid #000;
    }
    input[type="checkbox"]:focus{
        box-shadow: none !important; 
    }
    input[type="checkbox"]:checked{
        outline: none;
        border-color: transparent;
    }
    ul{
      font-weight: 500;
      font-size: 16px;
      display: flex;
      gap: 2px;
    }
    .page-link{
      font-family: Poppins, sans-serif;
      font-weight: 500;
      font-size: 16px;
      border: none;
      background: none;
      color: black;
      gap: 10px;
    }
    #prev{
      margin-right: 10px;
    }
    #next{
      margin-left: 10px;
    }
    #adicionar{
      font-family: Poppins,sans-serif;
      font-weight: 500;
      font-size: 16px;
      width: 10rem;
      height: 3rem;
      background-color: #D7A871;
    }
</style>