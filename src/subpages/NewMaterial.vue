<script setup lang="ts">
import { DiamondPlus, X } from 'lucide-vue-next'
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const props = defineProps<{
  visible: boolean
}>()

const isVisible = ref(props.visible)
const route = useRoute()
const router = useRouter()

watchEffect(() => {
    // Verificar a query 'add' para controlar a visibilidade do modal
    const add = route.query.add;
    isVisible.value = add === 'true';
})

function closeModal() {
    isVisible.value = false;
    // Alterar a query na URL para fechar o modal
    router.push({ path: '/materiais', query: { add: 'false' } });
}
</script>
<template>
  <div class="main-container" :style="{ display: props.visible ? 'flex' : 'none' }">
    <div class="title">Adicionar Material</div>
    <div class="close" @click="closeModal"><X /></div>
    <form>
      <div class="name-container">
        <input type="text" id="name" placeholder="" />
        <label class="name-label" for="name">Nome</label>
      </div>
      <div class="middle-container">
        <div class="tipo-container">
          <input type="text" id="tipo" placeholder="" />
          <label class="tipo-label" for="tipo">Tipo</label>
        </div>
        <div class="quantidade-container">
          <input type="number" id="quantidade" placeholder="" />
          <label class="quantidade-label" for="quantidade">Quantidade</label>
        </div>
      </div>
      <div class="descricao-container">
        <input type="text" id="descricao" placeholder="" />
        <label class="descricao-label" for="descricao">Descrição</label>
      </div>
    </form>
    <button type="submit">Adicionar<DiamondPlus width="22" height="22" /></button>
  </div>
</template>
<style scoped>
.main-container {
  user-select: none;
  position: absolute;
  top: calc(50% - 275px);
  left: calc(50% - 250px);
  width: 500px;
  height: 400px;
  background-color: white;
  border: 2px solid black;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  font-family: 'Sofia Sans';
  font-optical-sizing: auto;
}
.title {
  font-size: 30px;
  font-weight: bold;
  margin: 10px 0px 0px 20px;
}
.close {
  position: absolute;
  transform: none;
  top: 20px;
  left: calc(90% - 5px);
  transition: transform 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
}
.close:hover {
  cursor: pointer;
  transform: scale(1.1);
  color: red;
}
.close:active {
  color: rgb(124, 128, 252);
}
form {
  display: flex;
  flex-direction: column;
  max-width: 90%;
  margin-left: 20px;
  gap: 20px;
}

form label {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 5px;
}

form input {
  border: 2px solid black;
  border-radius: 6px;
  height: 35px;
}

form input:focus + label {
  color: #825a32;
}

form input:focus {
  outline: none;
  border-color: #825a32;
}

.name-container {
  display: flex;
  flex-direction: column-reverse;
}

.name-container input:focus + .name-label {
  color: #825a32;
}

.middle-container{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
}

.tipo-container {
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
}
.tipo-container input:focus + .tipo-label {
  color: #825a32;
}

.quantidade-container {
  display: flex;
  flex-direction: column-reverse;
}
.quantidade-container input:focus + .quantidade-label {
  color: #825a32;
}

.descricao-container {
  display: flex;
  flex-direction: column-reverse;
}
.descricao-container input{
    height: 50px;
}
.descricao-container input:focus + .descricao-label {
  color: #825a32;
}

button[type='submit'] {
  width: 150px;
  height: 40px;
  position: absolute;
  bottom: 20px;
  left: calc(90% - 130px);

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  border: 2px solid black;
  border-radius: 6px;
  background-color: #d7a871;

  font-weight: 600;
  font-size: 1.3rem;

  transition: all 0.2s cubic-bezier(0.47, 0, 0.745, 0.715);
}

button[type='submit']:hover {
  background-color: #d7a871;
  color: white;
  cursor: pointer;
  transform: scale(1.05);
}
</style>
