<script setup lang="ts">
import { Plus, Trash2Icon } from 'lucide-vue-next'
import Navbar from '../components/Navbar.vue'
import { computed, onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import NewUser from '@/subpages/NewUser.vue'

const options = []
const selected = ref<number[]>([])
const perPage = ref(10)
const route = useRoute()

const w_screen = ref(window.innerWidth)
const h_screen = ref(window.innerHeight)
sizePerWindow(h_screen.value)

function updateSize() {
  w_screen.value = window.innerWidth
  h_screen.value = window.innerHeight
}

function sizePerWindow(newHeight: number) {
  if (newHeight < 864) {
    perPage.value = 6
  } else if (newHeight < 956) {
    perPage.value = 8
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
  return selected.value.length === users.value.length
})

const toggleSelectAll = () => {
  if (selectAll.value) {
    selected.value = []
  } else {
    selected.value = users.value.map((user) => user.id)
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

const users = ref([
  {
    id: 1,
    nome: 'João Silva',
    morada: 'Rua das Flores, Lisboa',
    dataNascimento: '1985-06-15',
    especialidade: 'Cardiologia',
    email: 'joao.silva@example.com',
    telemovel: '912345678',
  },
  {
    id: 2,
    nome: 'Ana Martins',
    morada: 'Av. Central, Porto',
    dataNascimento: '1990-03-22',
    especialidade: 'Dermatologia',
    email: 'ana.martins@example.com',
    telemovel: '913456789',
  },
  {
    id: 3,
    nome: 'Carlos Oliveira',
    morada: 'Rua do Sol, Faro',
    dataNascimento: '1982-11-05',
    especialidade: 'Neurologia',
    email: 'carlos.oliveira@example.com',
    telemovel: '914567890',
  },
  {
    id: 4,
    nome: 'Sofia Rocha',
    morada: 'Estrada da Serra, Braga',
    dataNascimento: '1995-01-30',
    especialidade: 'Pediatria',
    email: 'sofia.rocha@example.com',
    telemovel: '915678901',
  },
  {
    id: 5,
    nome: 'Miguel Costa',
    morada: 'Rua Nova, Coimbra',
    dataNascimento: '1988-07-19',
    especialidade: 'Ortopedia',
    email: 'miguel.costa@example.com',
    telemovel: '916789012',
  },
  {
    id: 6,
    nome: 'Inês Almeida',
    morada: 'Av. da Liberdade, Lisboa',
    dataNascimento: '1993-09-25',
    especialidade: 'Ginecologia',
    email: 'ines.almeida@example.com',
    telemovel: '917890123',
  },
  {
    id: 7,
    nome: 'Pedro Fernandes',
    morada: 'Rua das Laranjeiras, Porto',
    dataNascimento: '1979-04-12',
    especialidade: 'Psiquiatria',
    email: 'pedro.fernandes@example.com',
    telemovel: '918901234',
  },
  {
    id: 8,
    nome: 'Rita Sousa',
    morada: 'Largo do Carmo, Évora',
    dataNascimento: '1987-10-08',
    especialidade: 'Oftalmologia',
    email: 'rita.sousa@example.com',
    telemovel: '919012345',
  },
  {
    id: 9,
    nome: 'Tiago Nunes',
    morada: 'Rua do Mercado, Leiria',
    dataNascimento: '1991-12-02',
    especialidade: 'Urologia',
    email: 'tiago.nunes@example.com',
    telemovel: '910123456',
  },
  {
    id: 10,
    nome: 'Cláudia Pinto',
    morada: 'Av. dos Aliados, Porto',
    dataNascimento: '1986-08-17',
    especialidade: 'Pedreido',
    email: 'claudia.pinto@example.com',
    telemovel: '911234567',
  },
  {
    id: 11,
    nome: 'Bruno Marques',
    morada: 'Rua das Oliveiras, Aveiro',
    dataNascimento: '1984-02-21',
    especialidade: 'Gastroenterologia',
    email: 'bruno.marques@example.com',
    telemovel: '912345679',
  },
  {
    id: 12,
    nome: 'Helena Ribeiro',
    morada: 'Rua das Hortas, Funchal',
    dataNascimento: '1992-06-13',
    especialidade: 'Endocrinologia',
    email: 'helena.ribeiro@example.com',
    telemovel: '913456780',
  },
  {
    id: 13,
    nome: 'Daniel Lopes',
    morada: 'Rua da Palmeira, Setúbal',
    dataNascimento: '1994-05-09',
    especialidade: 'Reumatologia',
    email: 'daniel.lopes@example.com',
    telemovel: '914567891',
  },
  {
    id: 14,
    nome: 'Mariana Figueiredo',
    morada: 'Av. Beira Mar, Viana do Castelo',
    dataNascimento: '1989-03-27',
    especialidade: 'Hematologia',
    email: 'mariana.figueiredo@example.com',
    telemovel: '915678902',
  },
  {
    id: 15,
    nome: 'Ricardo Teixeira',
    morada: 'Rua do Carmo, Lisboa',
    dataNascimento: '1983-11-11',
    especialidade: 'Oncologia',
    email: 'ricardo.teixeira@example.com',
    telemovel: '916789013',
  },
  {
    id: 16,
    nome: 'Sara Carvalho',
    morada: 'Travessa do Norte, Guarda',
    dataNascimento: '1990-02-14',
    especialidade: 'Nefrologia',
    email: 'sara.carvalho@example.com',
    telemovel: '917890134',
  },
  {
    id: 17,
    nome: 'André Gomes',
    morada: 'Rua da Escola, Castelo Branco',
    dataNascimento: '1986-07-29',
    especialidade: 'Anestesiologia',
    email: 'andre.gomes@example.com',
    telemovel: '918901245',
  },
  {
    id: 18,
    nome: 'Laura Neves',
    morada: 'Rua das Amoreiras, Santarém',
    dataNascimento: '1991-05-03',
    especialidade: 'Imunologia',
    email: 'laura.neves@example.com',
    telemovel: '919012356',
  },
  {
    id: 19,
    nome: 'Hugo Barros',
    morada: 'Rua do Forno, Viseu',
    dataNascimento: '1985-09-20',
    especialidade: 'Cirurgia Geral',
    email: 'hugo.barros@example.com',
    telemovel: '910123467',
  },
  {
    id: 20,
    nome: 'Patrícia Dias',
    morada: 'Rua das Lages, Beja',
    dataNascimento: '1993-12-26',
    especialidade: 'Medicina Interna',
    email: 'patricia.dias@example.com',
    telemovel: '911234578',
  },
  {
    id: 21,
    nome: 'Luís Matos',
    morada: 'Rua do Lago, Bragança',
    dataNascimento: '1980-01-18',
    especialidade: 'Cirurgia Plástica',
    email: 'luis.matos@example.com',
    telemovel: '912345689',
  },
])

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
  <div class="main-container">
    <Navbar :page="2" />
    <div class="container-fluid p-4 bg-light min-vh-100">
      <h2 class="mb-4 fw-bold" id="title">Users</h2>
      <div class="table-responsive bg-white">
        <table class="table mb-0">
          <thead class="text-center align-middle">
            <tr>
              <th scope="col">
                <input
                  type="checkbox"
                  class="form-check-input"
                  :checked="selectAll"
                  @change="toggleSelectAll"
                />
              </th>
              <th scope="col">Nome</th>
              <th scope="col">Morada</th>
              <th scope="col" class="data" ref="tableData">Data De Nascimento</th>
              <th scope="col" ref="tableEspecialidade">Especialidade</th>
              <th scope="col">Email</th>
              <th scope="col">Telemóvel</th>
              <th scope="col">Ação</th>
            </tr>
          </thead>
          <tbody class="text-center" >
            <tr v-for="user in paginatedUsers" :key="user.id">
              <td :style="{ backgroundColor: selected.includes(user.id) ? 'lightblue' : 'white' }">
                <input
                  type="checkbox"
                  class="form-check-input"
                  :value="user.id"
                  v-model="selected"
                />
              </td>
              <td :style="{ backgroundColor: selected.includes(user.id) ? 'lightblue' : 'white' }">
                {{ user.nome }}
              </td>
              <td
                class="morada"
                :style="{ backgroundColor: selected.includes(user.id) ? 'lightblue' : 'white' }"
              >
                {{ user.morada }}
              </td>
              <td class="data-row" :style="{minWidth: tableWidthData  , backgroundColor: selected.includes(user.id) ? 'lightblue' : 'white'}">
                {{ user.dataNascimento }}
              </td>
              <td :style="{backgroundColor: selected.includes(user.id) ? 'lightblue' : 'white' }">
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
                <button class="actions" style="color: red">
                  <Trash2Icon width="20px" height="20px" />
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
        <button class="btn btn-warning" id="adicionar">Adicionar</button>
      </div>
      <NewUser/>
    </div>
  </div>
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

td{
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
}

</style>
