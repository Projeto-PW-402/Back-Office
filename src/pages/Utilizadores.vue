<script setup lang="ts">
import { Plus, Trash2Icon } from 'lucide-vue-next'
import Navbar from '../components/Navbar.vue'
import {
  computed,
  h,
  onMounted,
  onUnmounted,
  onBeforeUnmount,
  ref,
  useTemplateRef,
  watch,
} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import NewUser from '@/subpages/NewUser.vue'
import { fetchUsers, deleteUser } from '@/services/userService'
import type { User } from '@/models/User'

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
  if (newHeight < 650) {
    perPage.value = 2
  } else if (newHeight < 864) {
    perPage.value = 6
  } else if (newHeight < 956) {
    perPage.value = 7
  } else if (newHeight < 1316) {
    perPage.value = 10
  } else {
    perPage.value = 17
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
  h_screen.value = newHeight
})

const selectAll = computed(() => {
  return selected.value.length === users.value.length
})

const toggleSelectAll = () => {
  if (selectAll.value) {
    selected.value = []
  } else {
    selected.value = users.value.map((user) => user.id)
  }
}

const isMenuEnabled = computed(() => {
  const add = route.query.add
  if (add === undefined || add === 'false') {
    return false
  } else {
    return true
  }
})

const addUser = ref(false)
const isModalActive = ref(isMenuEnabled.value)

watch(
  () => route.query.add,
  (newAdd) => {
    isModalActive.value = newAdd !== 'false' && newAdd !== undefined
  },
)

function handleClick() {
  addUser.value = true
  isModalActive.value = true
  router.push({ path: '/users', query: { add: 'true' } })
}

const users = ref<User[]>([])
let intervalId: number

async function loadUsers() {
  users.value = await fetchUsers()
  if (users.value.length === 0) {
    users.value = []
  } else {
    console.log('Utilizadores carregados com sucesso:', users.value)
  }
}

onMounted(async () => {
  await loadUsers()
  console.log(users.value)
  intervalId = window.setInterval(loadUsers, 5000)
})

onBeforeUnmount(() => {
  clearInterval(intervalId)
})

async function removeUser(userId: number) {
  try {
    await deleteUser(userId)
    await loadUsers()
    console.log('Utilizador eliminado com sucesso:', userId)
  } catch (error) {
    console.error('Erro ao eliminar utilizador:', error)
  }
}

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return users.value.slice(start, start + perPage.value)
})

const selectedPage = computed(() => {
  const page = route.query.page
  const pageStr = Array.isArray(page) ? page[0] : page
  return parseInt(pageStr || '1')
})

const totalPages = computed(() => Math.ceil(users.value.length / perPage.value))
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

const tableData = useTemplateRef<HTMLDivElement>('tableData')
const tableEspecialidade = useTemplateRef<HTMLDivElement>('tableEspecialidade')
const tableWidthData = ref()
const tableWidthEspecialidade = ref()
onMounted(() => {
  tableWidthData.value = tableData.value?.getBoundingClientRect().width
  tableWidthEspecialidade.value = tableEspecialidade.value?.getBoundingClientRect().width
  console.log('Width of tableData:', tableWidthEspecialidade.value)
})
</script>

<template>
  <div class="main-container" :style="{ filter: isModalActive ? 'blur(5px)' : 'blur(0)' }">
    <Navbar :page="2" :disable="isModalActive" />
    <div class="container-fluid p-4 bg-light min-vh-100">
      <h2 class="mb-4 fw-bold" id="title">Users</h2>
      <div class="table-responsive bg-white">
        <table class="table mb-0">
          <thead class="text-center align-middle">
            <tr>
              <!-- <th scope="col">
                <input
                  type="checkbox"
                  class="form-check-input"
                  :checked="selectAll"
                  @change="toggleSelectAll"
                />
              </th> -->
              <th scope="col">Nome</th>
              <th scope="col">Morada</th>
              <th scope="col" class="data" ref="tableData">Data De Nascimento</th>
              <th scope="col" ref="tableEspecialidade">Especialidade</th>
              <th scope="col">Email</th>
              <th scope="col">Telemóvel</th>
              <th scope="col">Ação</th>
            </tr>
          </thead>
          <tbody class="text-center" v-if="users.length > 0">
            <tr v-for="user in paginatedUsers" :key="user.id">
              <!-- <td :style="{ backgroundColor: selected.includes(user.id) ? 'lightblue' : 'white' }">
                <input
                  type="checkbox"
                  class="form-check-input"
                  :value="user.id"
                  v-model="selected"
                />
              </td> -->
              <td :style="{ backgroundColor: selected.includes(user.id) ? 'lightblue' : 'white' }">
                {{ user.nome }}
              </td>
              <td
                class="morada"
                :style="{ backgroundColor: selected.includes(user.id) ? 'lightblue' : 'white' }"
              >
                {{ user.morada }}
              </td>
              <td
                class="row"
                :style="{
                  minWidth: tableWidthData,
                  backgroundColor: selected.includes(user.id) ? 'lightblue' : 'white',
                }"
              >
                {{ user.dataNascimento }}
              </td>
              <td :style="{ backgroundColor: selected.includes(user.id) ? 'lightblue' : 'white' }">
                {{ user.especialidade }}
              </td>
              <td :style="{ backgroundColor: selected.includes(user.id) ? 'lightblue' : 'white' }">
                <a href="emailto:{{ user.email }}">Send Email</a>
              </td>
              <td :style="{ backgroundColor: selected.includes(user.id) ? 'lightblue' : 'white' }">
                {{ user.telemovel }}
              </td>
              <td
                class="actions-container"
                :style="{ backgroundColor: selected.includes(user.id) ? 'lightblue' : 'white' }"
              >
                <button class="actions" style="color: orange">
                  <Plus width="20px" height="20px" />
                </button>
                <button class="actions" style="color: red" @click="removeUser(user.id)">
                  <Trash2Icon width="20px" height="20px" />
                </button>
              </td>
            </tr>
          </tbody>
          <p v-else></p>
        </table>
      </div>

      <!-- Paginação -->
      <nav class="pagination">
        <ul class="pagination pagination-sm mb-0">
          <!-- Previous Button -->
          <li v-if="currentPage != 1" class="page-item">
            <router-link
              :to="{
                path: '/users',
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
                path: '/users',
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
            :to="{ path: '/users', query: { page: 1 } }"
            class="page-link"
          >
            First
          </router-link>
          <router-link
            v-else
            :to="{ path: '/users', query: { page: 1 } }"
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
              :to="{ path: '/users', query: { page } }"
              class="page-link"
            >
              {{ page }}
            </router-link>
            <span v-else class="page-link active">{{ page }}</span>
          </li>
          <router-link
            v-if="currentPage !== totalPages"
            :to="{ path: '/users', query: { page: totalPages } }"
            class="page-link"
          >
            Last
          </router-link>
          <router-link
            v-else
            :to="{ path: '/users', query: { page: totalPages } }"
            class="page-link disabled"
          >
            Last
          </router-link>
          <!-- Next Button -->
          <li v-if="currentPage == totalPages" class="page-item disabled">
            <router-link
              :to="{
                path: '/users',
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
                path: '/users',
                query: { page: currentPage + 1 },
              }"
              class="page-link"
            >
              <span class="page-link" id="next">Next >></span>
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- Botão Adicionar -->
      <div class="text-end mt-3">
        <button class="btn btn-warning" id="adicionar" @click="handleClick">Adicionar</button>
      </div>
    </div>
  </div>
  <NewUser :visible="isModalActive" @user-added="loadUsers" />
</template>

<style scoped>
.main-container {
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
  table-layout: fixed;
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

.data {
  min-width: max-content;
}

.morada {
  font-size: 14px;
  font-weight: 500;
}

tbody {
  background-color: transparent;
  border-radius: 0%;
  font-family: Poppins, sans-serif;
  font-weight: 500;
  /* margin-inline: 10px; */
  width: auto;
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

td {
  background-color: #fff;
  border: none;
  border-radius: 0%;
  font-family: Poppins, sans-serif;
  font-weight: 500;
  margin-inline: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
  font-family: Poppins, sans-serif;
  font-weight: 500;
  font-size: 16px;
  border: none;
  background: none;
  color: black;
  gap: 10px;
}

.active {
  color: lightblue;
  font-weight: 600;
  font-size: 20px;
}

.disabled {
  opacity: 0.5;
}

.actions-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.actions {
  border: none;
  background-color: transparent;
  transition: transform 0.2s linear;
}

.actions:hover {
  transform: rotate(5deg) scale(1.4);
}

#prev {
  margin-right: 10px;
}

#next {
  margin-left: 10px;
}

#adicionar {
  font-family: Poppins, sans-serif;
  font-weight: 500;
  font-size: 16px;
  width: 10rem;
  height: 3rem;
  background-color: #d7a871;
  transition: all 0.2s cubic-bezier(0.47, 0, 0.745, 0.715);
}

#adicionar:hover {
  background-color: #d7a871;
  color: white;
  cursor: pointer;
  transform: scale(1.05);
}
</style>
