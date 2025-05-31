<script setup lang="ts">
import type { Auditoria } from '@/models/Auditoria'
import Navbar from '../components/Navbar.vue'
import { Check, X, Info, FileText, Timer } from 'lucide-vue-next'
import { computed, h, onBeforeUnmount, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { editAuditoria, fetchAuditorias, generateFile } from '@/services/auditoriasService'

const options = []
const selected = ref<number[]>([])
const perPage = ref(10)
const route = useRoute()
const router = useRouter()

const w_screen = ref(window.innerWidth)
const h_screen = ref(window.innerHeight)
sizePerWindow(h_screen.value)

function updateSize() {
  w_screen.value = window.innerWidth
  h_screen.value = window.innerHeight
}

function sizePerWindow(newHeight: number) {
  if (newHeight < 864) {
    perPage.value = 8
  } else if (newHeight < 956) {
    perPage.value = 10
  } else {
    perPage.value = 10
  }
}

onMounted(() => {
  window.addEventListener('resize', updateSize)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSize)
})

watch(h_screen, (newHeight) => {
  sizePerWindow(newHeight)
})

const selectAll = computed(() => {
  return selected.value.length === pedidos.value.length
})

const toggleSelectAll = () => {
  if (selectAll.value) {
    selected.value = []
  } else {
    selected.value = pedidos.value.map((pedido) => pedido.id)
  }
}

const paginatedpedidos = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return pedidos.value.slice(start, start + perPage.value)
})

const selectedPage = computed(() => {
  const page = route.query.page
  const pageStr = Array.isArray(page) ? page[0] : page
  return parseInt(pageStr || '1')
})

const pedidos = ref<Auditoria[]>([])
let intervalId: number

async function loadAuditorias() {
  pedidos.value = await fetchAuditorias()
  if (pedidos.value.length === 0) {
    pedidos.value = []
  } else {
    console.log('Auditorias carregadas com sucesso:', pedidos.value)
  }
}

onMounted(async () => {
  await loadAuditorias()
  console.log(pedidos.value)
  intervalId = window.setInterval(loadAuditorias, 5000)
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})

const totalPages = computed(() => Math.ceil(pedidos.value.length / perPage.value))
const currentPage = ref(selectedPage.value)

const visiblePages = computed(() => {
  const pages = []

  const half = Math.floor(4 / 2)
  let start = Math.max(currentPage.value - half, 1)
  let end = start + 4 - 1

  if (end > totalPages.value) {
    end = totalPages.value
    start = Math.max(end - 4, 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

watch(selectedPage, (newPage) => {
  currentPage.value = newPage
  console.log('Current page:', newPage)
})

function onAccept(auditoria_id: number) {
  console.log('Auditoria ID:', auditoria_id)
  router.push({ path: `pedidos/config/${auditoria_id}` })
}

function dateFormat(date: string) {
  const time = date.split(' ')[0]
  const data = date.split(' ')[2]
  const hora = data.split('-')[0]
  const minuto = data.split('-')[1]
  const segundo = data.split('-')[2]

  return time + '  ' + hora + ':' + minuto + ':' + segundo
}

async function rejectAuditoria(auditoria_id: number, data: Auditoria) {
  data.status = -1
  try {
    await editAuditoria(auditoria_id, data)
    await loadAuditorias()
    console.log('Utilizador eliminado com sucesso:', auditoria_id)
  } catch (error) {
    console.error('Erro ao eliminar utilizador:', error)
  }
}
async function requestInfo(auditoria_id: number, data: Auditoria) {
  data.status = 0
  try {
    await editAuditoria(auditoria_id, data)
    await loadAuditorias()
    console.log('Estado:', auditoria_id)
  } catch (error) {
    console.error('Erro ao editar Estado:', error)
  }
}
async function terminarAuditoria(auditoria_id: number, data: Auditoria) {
  data.status = 2
  try {
    await editAuditoria(auditoria_id, data)
    await loadAuditorias()
    console.log('Estado:', auditoria_id)
  } catch (error) {
    console.error('Erro ao editar Estado:', error)
  }
}

async function downloadFile(id: number) {
  try {
    await generateFile(id)
  } catch (error) {
    console.error('Erro ao editar Estado:', error)
  }
}
</script>

<template>
  <div class="auditorias-container">
    <Navbar :page="3" />
    <div class="frame">
      <div class="container-fluid p-4 bg-light" id="table-container">
        <h2 class="mb-4 fw-bold" id="title">Auditorias</h2>
        <div class="table-responsive bg-white">
          <table class="table mb-0">
            <thead class="text-center align-middle">
              <tr>
                <th scope="col">Estado</th>
                <th scope="col">Utilizador</th>
                <th scope="col">Local</th>
                <th scope="col">Data</th>
                <th scope="col">Ação</th>
                <th scope="col">Documento</th>
              </tr>
            </thead>
            <tbody class="text-center align-middle">
              <tr v-for="pedido in paginatedpedidos" :key="pedido.id">
                <td
                  :style="{ backgroundColor: selected.includes(pedido.id) ? 'lightblue' : 'white' }"
                >
                  <p v-if="pedido.status === 0" :style="{ color: 'orange' }">
                    Em Análise <Timer />
                  </p>
                  <p v-else-if="pedido.status === -1" :style="{ color: 'red' }">Recusado <X /></p>
                  <p v-else-if="pedido.status === 1" :style="{ color: 'green' }">
                    Aceite <Check />
                  </p>
                  <p v-else :style="{ color: 'gray' }">Terminado <Check /></p>
                </td>
                <td
                  :style="{ backgroundColor: selected.includes(pedido.id) ? 'lightblue' : 'white' }"
                >
                  {{ pedido.nome }}
                </td>
                <td
                  :style="{ backgroundColor: selected.includes(pedido.id) ? 'lightblue' : 'white' }"
                >
                  {{ pedido.location }}
                </td>
                <td
                  :style="{ backgroundColor: selected.includes(pedido.id) ? 'lightblue' : 'white' }"
                >
                  {{ pedido.date }}
                </td>
                <td
                  :style="{ backgroundColor: selected.includes(pedido.id) ? 'lightblue' : 'white' }"
                >
                  <template v-if="pedido.status !== 1 && pedido.status !== 2">
                    <button @click="onAccept(pedido.id)" class="actions" style="color: green">
                      <Check width="20px" height="20px" />
                    </button>
                    <button
                      @click="rejectAuditoria(pedido.id, pedido)"
                      class="actions"
                      style="color: red"
                    >
                      <X width="20px" height="20px" />
                    </button>
                    <button
                      @click="requestInfo(pedido.id, pedido)"
                      class="actions"
                      style="color: yellow"
                    >
                      <Info width="20px" height="20px" />
                    </button>
                  </template>

                  <template v-else-if="pedido.status === 1">
                    <button
                      @click="terminarAuditoria(pedido.id, pedido)"
                      class="actions"
                      :style="{ color: 'red', fontSize: '20px' }"
                    >
                      Terminar
                    </button>
                  </template>
                  <template v-else>
                    <button class="actions" :style="{ color: 'gray', fontSize: '20px' }">
                      No Actions
                    </button>
                  </template>
                </td>
                <td
                  :style="{ backgroundColor: selected.includes(pedido.id) ? 'lightblue' : 'white' }"
                >
                  <button class="download" @click="downloadFile(pedido.id)">
                    Download
                    <FileText width="20px" height="20px" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Paginação -->
        <nav class="pagination">
          <ul class="pagination pagination-sm mb-0">
            <!-- Previous Button -->
            <li v-if="currentPage != 1" class="page-item">
              <router-link
                :to="{
                  path: '/auditorias/pedidos',
                  query: { page: currentPage - 1 },
                }"
                class="page-link"
              >
                <span class="page-link" id="prev">&lt;&lt;Prev</span>
              </router-link>
            </li>
            <li v-else class="page-item disabled">
              <router-link
                :to="{
                  path: '/auditorias/pedidos',
                  query: { page: currentPage - 1 },
                }"
                class="page-link"
              >
                <span class="page-link" id="prev">&lt;&lt;Prev</span>
              </router-link>
            </li>
            <!-- Numbers -->
            <router-link
              v-if="currentPage !== 1"
              :to="{ path: '/auditorias/pedidos', query: { page: 1 } }"
              class="page-link"
            >
              First
            </router-link>
            <router-link
              v-else
              :to="{ path: '/auditorias/pedidos', query: { page: 1 } }"
              class="page-link disabled"
            >
              First
            </router-link>
            <li
              v-for="page in visiblePages"
              :key="page"
              :class="['page-item', { active: page === currentPage }]"
            >
              <router-link
                v-if="page !== currentPage"
                :to="{ path: '/auditorias/pedidos', query: { page } }"
                class="page-link"
              >
                {{ page }}
              </router-link>
              <span v-else class="page-link active">{{ page }}</span>
            </li>
            <router-link
              v-if="currentPage !== totalPages"
              :to="{ path: '/auditorias/pedidos', query: { page: totalPages } }"
              class="page-link"
            >
              Last
            </router-link>
            <router-link
              v-else
              :to="{ path: '/auditorias/pedidos', query: { page: totalPages } }"
              class="page-link disabled"
            >
              Last
            </router-link>
            <!-- Next Button -->
            <li v-if="currentPage == totalPages" class="page-item disabled">
              <router-link
                :to="{
                  path: '/auditorias/pedidos',
                  query: { page: currentPage + 1 },
                }"
                class="page-link"
              >
                <span class="page-link" id="next">Next >></span>
              </router-link>
            </li>
            <li v-else class="page-item">
              <router-link
                :to="{
                  path: '/auditorias/pedidos',
                  query: { page: currentPage + 1 },
                }"
                class="page-link"
              >
                <span class="page-link" id="next">Next >></span>
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<style scoped>
.frame {
  pedido-select: none;
  width: 100%;
  max-height: 100dvh;
  display: flex;
  flex-direction: column;
}

.sub-navbar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 125px;
  background-color: #825a32;
}

.sub-navbar-list {
  display: flex;
  gap: 500px;
  list-style: none;
}

.sub-navbar-buttons {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 10rem;
  height: 3rem;

  font-family: Poppins, sans-serif;
  font-weight: 500;
  font-size: 16px;

  background-color: #d7a871;
  color: #fff;
  border: none;
}

.auditorias-container {
  display: flex;
}

#title {
  font-family: Poppins, sans-serif;
  font-weight: 600;
}

#table-container {
  max-height: calc(100dvh - 125px);
  height: 100%;
}

table {
  background: transparent;
  width: 100%;
}

tr {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

th {
  background-color: #d7d7d7;
  border-radius: 0%;
  font-family: Poppins, sans-serif;
  font-weight: 500;
  margin-inline: 10px;
  width: 100%;
  margin-bottom: 10px;
}

tbody {
  background-color: transparent;
  border-radius: 0%;
  font-weight: 500;
  margin-inline: 10px;
  width: 100%;
}

td {
  background-color: #fff;
  border: none;
  border-radius: 0%;
  font-family: Anaheim, sans-serif;
  font-size: 18px;
  font-weight: 500;
  margin-inline: 10px;
  width: 100%;
}

input[type='checkbox'] {
  width: 20px;
  height: 20px;
  border: 2px solid #000;
}

input[type='checkbox']:focus {
  box-shadow: none !important;
}

input[type='checkbox']:checked {
  outline: none;
  border-color: transparent;
}

ul {
  font-weight: 500;
  font-size: 16px;
  display: flex;
  gap: 2px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
.page-link {
  font-family: Inter, sans-serif;
  font-weight: 500;
  font-size: 16px;
  border: none;
  background: none;
  color: black;
  gap: 10px;
}
.active {
  color: rgb(255, 159, 63);
  font-weight: 600;
  font-size: 20px;
}
.disabled {
  opacity: 0.5;
}

#prev {
  margin-right: 10px;
}

#next {
  margin-left: 10px;
}

.download {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;

  border: none;
  background-color: inherit;
  width: 100%;
  height: auto;

  font-family: Poppins, sans-serif;
  font-weight: 500;
  font-size: 16px;
}

.actions {
  border: none;
  background-color: inherit;
  width: auto;
  height: auto;
  margin-right: 5px;
  transition: transform 0.2s linear;
}
</style>
