<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import { Auditoria } from '@/models/Auditoria'
import { Material } from '@/models/Material'
import type { User } from '@/models/User'
import { fetchMaterialById, fetchMaterials, updateMaterial } from '@/services/materialService'
import { fetchUserById, fetchUsers, updateUser } from '@/services/userService'
import {
  computed,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  watch,
  watchEffect,
} from 'vue'
import IMask from 'imask'
import { editAuditoria, fetchAuditoriaById } from '@/services/auditoriasService'
import { useRoute, useRouter } from 'vue-router'

// Modo de desenvolvimento, para testes
const dev = true
console.log('Dev Mode:', dev)
//

const date = ref('')
const time = ref('')
const risco = ref('1')

const router = useRouter()
const route = useRoute()
const id = computed(() => Number(route.params.id))
console.log('ID da Auditoria:', id.value)

const inputUserIds = ref<number[]>([])
// const selectedUsers = ref<{ id: number }[]>([])

// Lista final com id e quantidade escolhida
const inputQuantidades = reactive<Record<number, number>>({})
const selectedMaterials = ref<{ id: number; quantidade: number }[]>([])
const erro = ref('')

async function createAuditoria() {
  try {
    selectedMaterials.value = Object.entries(inputQuantidades)
      .filter(([_, qtd]) => qtd > 0)
      .map(([id, qtd]) => ({
        id: Number(id),
        quantidade: qtd,
      }))

    for (const m of selectedMaterials.value) {
      const material: Material = await fetchMaterialById(m.id)
      if (material) {
        material.quant -= m.quantidade
      }
      await updateMaterial(m.id, material)
      auditoria['materiais'].push({
        id: m.id,
        quantidade: m.quantidade,
      })
    }
    for (const u of inputUserIds.value) {
      const user: User = await fetchUserById(u)
      if (user) {
        user['listaAuditorias'].push(id.value)
        await updateUser(u, user)
      }
    }

    auditoria.date = date.value + ' ' + time.value
    auditoria.status = 1
    auditoria.risco = parseInt(risco.value)

    await editAuditoria(id.value, auditoria)

    if (dev) {
      console.log('Materiais Selecionados', selectedMaterials.value)
      console.log('Utilizadores Selecionados', inputUserIds.value)
      console.log('Auditoria Atualizada:', auditoria)
    }
    // Alterar a query na URL para fechar o modal
    router.push({ path: '/auditorias/pedidos' })
  } catch {
    return
  }
}

const users = ref<User[]>([])

async function loadUsers() {
  users.value = await fetchUsers()

  if (users.value.length === 0) {
    users.value = []
  } else if (dev) {
    console.log('Utilizadores:', users.value)
    console.log('Selecionados:', inputUserIds)
  }
}

const materiais = ref<Material[]>([])

async function loadMaterials() {
  materiais.value = await fetchMaterials()
  if (materiais.value.length === 0) {
    materiais.value = []
  } else {
    console.log('Materiais carregados com sucesso:', materiais.value)
  }
}

let auditoria = new Auditoria()

async function loadAuditoria() {
  auditoria = await fetchAuditoriaById(id.value)
  if (auditoria == null) {
    erro.value = 'Auditoria não encontrada'
    return
  }
}

const inputRef = ref(null)
const inputTimeRef = ref(null)

onMounted(async () => {
  await loadUsers()
  await loadMaterials()
  if (inputRef.value) {
    IMask(inputRef.value, {
      mask: '00/00/0000',
    })
  }
  if (inputTimeRef.value) {
    IMask(inputTimeRef.value, {
      mask: '00:00',
      lazy: true, // Mantém o campo visível mesmo sem valor
    })
  }
  if (dev) {
    console.log('Utilizadores carregados:', users.value)
    console.log('Materiais carregados:', materiais.value)
    console.log('Auditoria carregada:', auditoria)
  }
  // intervalId = window.setInterval(loadUsers, 5000)
})

onBeforeMount(async () => {
  await loadAuditoria()
})
</script>
<template>
  <div class="main-container">
    <Navbar :page="3" :disable="true" />
    <form id="auditoriaForm" @submit.prevent="createAuditoria">
      <div class="inputs-container">
        <div class="top-inputs">
          <div class="top-left-cotainer">
            <div class="little-title">Pedido</div>
            <div class="form">
              <div class="tl-top-form">
                <div class="nome-container tl-input">
                  <input type="text" id="nome" v-model="auditoria.nome" disabled required />
                  <label class="nome-label" for="nome">Nome</label>
                </div>
                <div class="origem-container tl-input">
                  <input type="text" id="origem" v-model="auditoria.location" disabled required />
                  <label class="origem-label" for="origem">Origem</label>
                </div>
              </div>
              <div class="tipo-container tl-input">
                <input type="text" id="tipo" v-model="auditoria.tipo" disabled required />
                <label class="tipo-label" for="tipo">Tipo</label>
              </div>
              <div class="descricao-container tl-input">
                <input type="text" id="descricao" v-model="auditoria.descricao" disabled required />
                <label class="descricao-label" for="descricao">Descrição</label>
              </div>
            </div>
          </div>
          <div class="top-right-cotainer">
            <div class="little-title">Equipa</div>
            <table class="tr-table">
              <thead class="tr-table-header">
                <tr>
                  <th class="tr-h">Selecionar</th>
                  <th class="tr-h">Trabalhador</th>
                </tr>
              </thead>
            </table>
            <div class="tr-body-scroll">
              <table class="tr-table">
                <tbody>
                  <tr v-for="user in users" :key="user.id">
                    <td
                      class="tr-d"
                      :style="{
                        backgroundColor: user.id % 2 == 0 ? 'transparent' : '#d3dce6',
                      }"
                    >
                      <input
                        type="checkbox"
                        class="form-check-input"
                        :value="user.id"
                        v-model="inputUserIds"
                        :disabled="!user.allowed"
                      />
                    </td>
                    <td
                      class="tr-d"
                      :style="{ backgroundColor: user.id % 2 === 0 ? 'transparent' : '#d3dce6' }"
                    >
                      <div v-if="user.allowed == true">{{ user.nome }}</div>
                      <div v-else :style="{ color: 'lightgray' }">{{ user.nome }}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="bottom-inputs">
          <div class="bottom-left-container">
            <div class="little-title">Materiais</div>
            <table class="bl-table">
              <thead class="bl-table-header">
                <tr>
                  <th class="bl-h">Material</th>
                  <th class="bl-h">Quantidade</th>
                </tr>
              </thead>
            </table>
            <div class="bl-body-scroll">
              <table class="bl-table">
                <tbody>
                  <tr v-for="material in materiais" :key="material.id">
                    <td
                      class="bl-d"
                      :style="{
                        backgroundColor: material.id % 2 === 0 ? 'transparent' : '#d3dce6',
                      }"
                    >
                      {{ material.nome }}
                    </td>
                    <td
                      class="bl-d"
                      :style="{
                        backgroundColor: material.id % 2 === 0 ? 'transparent' : '#d3dce6',
                      }"
                    >
                      <input
                        type="number"
                        v-model.number="inputQuantidades[material.id]"
                        min="0"
                        :max="material.quant"
                        placeholder="0"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="bottom-right-container">
            <div class="little-title">Finalizar</div>
            <div class="form">
              <div class="first-layer">
                <div class="data-container">
                  <input
                    ref="inputRef"
                    v-model="date"
                    placeholder="dd/mm/yyyy"
                    class="form-control"
                    type="text"
                    required
                  />
                  <label class="data-label" for="data">Data</label>
                </div>
                <div class="selector-container">
                  <select v-model="risco" class="selector" required>
                    <option value="1" selected>1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <label class="Nivel Risco" for="risco">Nivel de Risco</label>
                </div>
              </div>
              <div class="inicio-container">
                <input
                  type="text"
                  id="inicio"
                  placeholder=""
                  v-model="time"
                  ref="inputTimeRef"
                  class="form-control"
                  required
                />
                <label class="inicio-label" for="inicio">Inicio</label>
              </div>

              <button type="submit" class="btn btn-primary">Finalizar</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<style scoped>
.main-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  background-color: #e6e6e6;
  font-family: 'Sofia Sans', 'Poppins', sans-serif;
}
.inputs-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: calc(100dvw - 400px);
  /* background-color: blue; */
  margin: 4.5rem;
  padding: 0rem;
}

.top-inputs {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50%;
  /* background-color: blue; */
}

.bottom-inputs {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50%;
  /* background-color: blue; */
}

/* Top left Container */
.top-left-cotainer {
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  /* background-color: wheat; */
  padding: 2rem;
  margin-left: 2rem;
}

.little-title {
  font-size: 0.75rem;
  font-weight: 600;
}
.form {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  /* background-color: lightblue; */
  gap: 2rem;
}
.tl-top-form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
}
.tl-input {
  display: flex;
  flex-direction: column-reverse;
}
.nome-container {
  width: 70%;
}
.nome-container input:focus + .nome-label {
  color: #825a32;
}
.origem-container {
  width: 70%;
}
.origem-container input:focus + .origem-label {
  color: #825a32;
}
.tipo-container {
  width: 50%;
}
.tipo-container input:focus + .tipo-label {
  color: #825a32;
}
.descricao-container input {
  height: 4rem;
}
.descricao-container input:focus + .descricao-label {
  color: #825a32;
}

.top-left-cotainer label {
  font-size: 1.1rem;
  font-weight: 500;
}
.top-left-cotainer input {
  border: 2px solid black;
  border-radius: 2px;
  min-height: 2rem;
  outline: none;
}
.top-left-cotainer input:focus {
  border-color: #825a32;
}
/* Top Right Container */
.top-right-cotainer {
  /* display: flex;
    flex-direction: column;
    align-items: center; */
  width: 50%;
  height: 100%;
  /* background-color: wheat; */
  padding: 2rem;
  margin-right: 2rem;
}
.tr-table {
  width: 100%;
  /* height: auto; */
  overflow-y: scroll;
  border: 2px solid black;
  table-layout: fixed;
}
.tr-table-header tr {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.tr-table-header .tr-h {
  position: sticky;
  top: 0;
  padding-block: 0.5rem;
  width: 100%;
  text-align: center;
}
.tr-table-header .tr-h:first-child {
  width: 40%;
}
.tr-body-scroll {
  max-height: 240px;
  overflow-y: auto;
  border: 2px solid black;
  border-top: none;
}
.tr-body-scroll .tr-table {
  border: none;
}
.tr-body-scroll .tr-table tbody {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  width: 100%;
}
.tr-body-scroll .tr-table tr {
  display: flex;
  width: 100%;
}
.tr-body-scroll .tr-table .tr-d {
  display: flex;
  justify-content: center;
  align-items: start;
  /* text-align: center; */
  font-weight: 500;
  font-size: 20px;
  width: 100%;
  /* border-bottom: 2px solid black; */
}
.tr-body-scroll .tr-table .tr-d:first-child {
  width: 40%;
}

.form-check-input {
  width: 20px;
  height: 20px;
  border: 2px solid #000;
}

.form-check-input:focus {
  box-shadow: none !important;
}

.form-check-input:checked {
  outline: none;
  border-color: transparent;
}
/* Bottom Left */
.bottom-left-container {
  /* display: flex;
    flex-direction: column;
    align-items: center; */
  width: 50%;
  height: 100%;
  /* background-color: wheat; */
  padding: 2rem;
  margin-left: 2rem;
  margin-bottom: 2rem;
}
.bl-table {
  width: 100%;
  /* height: auto; */
  overflow-y: scroll;
  border: 2px solid black;
  table-layout: fixed;
}
.bl-table-header tr {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.bl-table-header .bl-h {
  position: sticky;
  top: 0;
  padding-block: 0.5rem;
  width: 100%;
  text-align: center;
}
.bl-table-header .bl-h:first-child {
  width: 90%;
}
.bl-body-scroll {
  max-height: 240px;
  overflow-y: auto;
  border: 2px solid black;
  border-top: none;
}
.bl-body-scroll .bl-table {
  border: none;
}
.bl-body-scroll .bl-table tbody {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  width: 100%;
}
.bl-body-scroll .bl-table tr {
  display: flex;
  width: 100%;
}
.bl-body-scroll .bl-table .bl-d {
  display: flex;
  justify-content: center;
  align-items: center;
  /* text-align: center; */
  font-weight: 500;
  font-size: 18px;
  width: 100%;
  /* border-bottom: 2px solid black; */
}
.bl-body-scroll .bl-table .bl-d input {
  width: 6rem;
  height: 1.8rem;
  border: 1px solid black;
  border-radius: 2px;
  text-align: center;
  outline: none;
}
.bl-body-scroll .bl-table .bl-d input:focus {
  border: 1px solid #d7a871;
  -moz-appearance: textfield;
}
.bl-body-scroll .bl-table .bl-d input::-webkit-outer-spin-button,
.bl-body-scroll .bl-table .bl-d input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.bl-body-scroll .bl-table .bl-d:first-child {
  width: 100%;
}

/* Bottom Right */

.bottom-right-container {
  width: 50%;
  height: 100%;
  /* background-color: wheat; */
  padding: 2rem;
  margin-right: 2rem;
  margin-bottom: 2rem;
}

.bottom-right-container form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
  height: 100%;

  font-weight: 500;
  font-size: 1.1rem;
}

.first-layer {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 3rem;
}
.selector-container {
  display: flex;
  flex-direction: column-reverse;
  width: 30%;
}
.selector {
  height: 32px;
  border: 1px solid black;
}
.data-container {
  display: flex;
  width: 30%;
  flex-direction: column-reverse;
}
.data-container input {
  width: 100%;
  height: 2rem;
  text-align: center;
  border: 1px solid black;
  border-radius: 2px;
  outline: none;
}
.data-container input:focus {
  color: #d7a871;
  border: 1px solid #d7a871;
}
.inicio-container {
  display: flex;
  width: 30%;
  flex-direction: column-reverse;
}

.inicio-container input {
  width: 100%;
  height: 2rem;
  text-align: center;
  border: 1px solid black;
  border-radius: 2px;
  outline: none;
}
.inicio-container input:focus {
  border: 1px solid #d7a871;
}

.bottom-right-container button {
  align-self: center;
  width: 10rem;
  color: black;
  background-color: #d7a871;
  border: 1px solid #745c3e;
}
.bottom-right-container button:active {
  background-color: #745c3e;
  border: 1px solid #d7a871;
}

@media screen and (max-width: 1700px) {
  .inputs-container {
    display: flex;
    width: 100%;
    margin: 2.5rem;
    padding: 2rem;
  }
  .nome-container {
    width: 55%;
  }
}
@media screen and (max-width: 1400px) {
  .inputs-container {
    display: flex;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  .top-inputs {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 50%;
    /* background-color: blue; */
  }
  .nome-container {
    width: 55%;
  }
  .bottom-inputs {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 50%;
    /* background-color: blue; */
  }
  .top-left-cotainer {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
  }
  .top-right-cotainer {
    width: 50%;
    height: 100%;
  }
}

/* Scroll Bar */
.tr-body-scroll::-webkit-scrollbar {
  width: 10px;
}

/* Fundo da scrollbar */
.tr-body-scroll::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 0px;
}

/* Parte deslizável */
.tr-body-scroll::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 0px;
  border: 2px solid #f0f0f0;
}

/* Hover */
.tr-body-scroll::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}
</style>
