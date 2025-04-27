<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
import { useRoute } from 'vue-router';
import { Check, X, Info, FileText } from 'lucide-vue-next';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

const options = [];
const selected = ref<number[]>([]);
const perPage = ref(10);
const route = useRoute();

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
  }
  else if (newHeight < 956) {
    perPage.value = 10
  }
  else {
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
    return selected.value.length === pedidos.value.length;
});

const toggleSelectAll = () => {
    if (selectAll.value) {
        selected.value = [];
    } else {
        selected.value = pedidos.value.map(pedido => pedido.id);
    }
};

const paginatedpedidos = computed(() => {
    const start = (currentPage.value - 1) * perPage.value;
    return pedidos.value.slice(start, start + perPage.value);
});

const selectedPage = computed(() => {
    const page = route.query.page
    const pageStr = Array.isArray(page) ? page[0] : page
    return parseInt(pageStr || '1')
})

const pedidos = ref([
    { id: 1, nome: 'João Silva', local: 'Lisboa', data: '2025-04-15' },
    { id: 2, nome: 'Ricardo Silva', local: 'Braga', data: '2025-04-6' },
    { id: 3, nome: 'Ana Costa', local: 'Porto', data: '2025-04-10' },
    { id: 4, nome: 'Mariana Sousa', local: 'Coimbra', data: '2025-04-12' },
    { id: 5, nome: 'Carlos Martins', local: 'Faro', data: '2025-04-18' },
    { id: 6, nome: 'Rita Almeida', local: 'Aveiro', data: '2025-04-20' },
    { id: 7, nome: 'Bruno Lopes', local: 'Setúbal', data: '2025-04-14' },
    { id: 8, nome: 'Sara Fernandes', local: 'Guimarães', data: '2025-04-09' },
    { id: 9, nome: 'Tiago Rocha', local: 'Leiria', data: '2025-04-07' },
    { id: 10, nome: 'Inês Ribeiro', local: 'Viseu', data: '2025-04-11' },
    { id: 11, nome: 'Miguel Pereira', local: 'Évora', data: '2025-04-22' },
    { id: 12, nome: 'Cláudia Martins', local: 'Lisboa', data: '2025-04-17' },
    { id: 13, nome: 'Paulo Silva', local: 'Porto', data: '2025-04-14' },
    { id: 14, nome: 'Juliana Ribeiro', local: 'Funchal', data: '2025-04-19' },
    { id: 15, nome: 'Sofia Mendes', local: 'Leiria', data: '2025-04-13' },
    { id: 16, nome: 'André Costa', local: 'Aveiro', data: '2025-04-16' },
    { id: 17, nome: 'Ricardo Lima', local: 'Braga', data: '2025-04-10' },
    { id: 18, nome: 'Carla Almeida', local: 'Viseu', data: '2025-04-08' },
    { id: 19, nome: 'Vítor Santos', local: 'Setúbal', data: '2025-04-21' },
    { id: 20, nome: 'Isabel Ferreira', local: 'Guarda', data: '2025-04-05' },
    { id: 21, nome: 'Daniela Nogueira', local: 'Coimbra', data: '2025-04-23' },
    { id: 22, nome: 'Rui Oliveira', local: 'Braga', data: '2025-04-11' },
    { id: 23, nome: 'Fábio Costa', local: 'Porto', data: '2025-04-18' },
    { id: 24, nome: 'Helena Rocha', local: 'Lisboa', data: '2025-04-20' },
    { id: 25, nome: 'Joana Martins', local: 'Faro', data: '2025-04-09' }
])

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

</script>

<template>
    <div class="auditorias-container">
        <Navbar :page="3"/>
        <div class="frame">
            <nav>
                <div class="sub-navbar-container">
                    <ul class="sub-navbar-list">
                        <li class="sub-navbar-elements">
                            <div class="btn btn-warning sub-navbar-buttons">Pedidos</div>
                        </li>
                        <li class="sub-navbar-elements">
                            <div class="btn btn-warning sub-navbar-buttons">Criar Auditoria</div>
                        </li>
                    </ul>
                </div>
            </nav>
            <div class="container-fluid p-4 bg-light" id="table-container">
                <div class="table-responsive bg-white ">
                    <table class="table  mb-0">
                        <thead class="text-center align-middle">
                            <tr>
                                <th scope="col">
                                    <input type="checkbox" class="form-check-input" :checked="selectAll"
                                        @change="toggleSelectAll" />
                                </th>
                                <th scope="col">Utilizador</th>
                                <th scope="col">Local</th>
                                <th scope="col">Data</th>
                                <th scope="col">Ação</th>
                                <th scope="col">Documento</th>
                            </tr>
                        </thead>
                        <tbody class="text-center align-middle">
                            <tr v-for="pedido in paginatedpedidos" :key="pedido.id">
                                <td :style="{ backgroundColor: selected.includes(pedido.id) ? 'lightblue' : 'white' }">
                                    <input type="checkbox" class="form-check-input" :value="pedido.id"
                                        v-model="selected" />
                                </td>
                                <td :style="{ backgroundColor: selected.includes(pedido.id) ? 'lightblue' : 'white' }">{{
                                    pedido.nome }}</td>
                                <td :style="{ backgroundColor: selected.includes(pedido.id) ? 'lightblue' : 'white' }">{{
                                    pedido.local }}</td>
                                <td :style="{ backgroundColor: selected.includes(pedido.id) ? 'lightblue' : 'white' }">{{
                                    pedido.data }}</td>
                                <td :style="{ backgroundColor: selected.includes(pedido.id) ? 'lightblue' : 'white' }">
                                    <button class="actions" style="color:green;">
                                        <Check width="20px" height="20px" />
                                    </button>
                                    <button class="actions" style="color:red;">
                                        <X width="20px" height="20px" />
                                    </button>
                                    <button class="actions" style="color:yellow;">
                                        <Info width="20px" height="20px" />
                                    </button>
                                </td>
                                <td :style="{ backgroundColor: selected.includes(pedido.id) ? 'lightblue' : 'white' }">
                                    <button class="download">
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
                            <router-link :to="{
                                path: '/auditorias/pedidos',
                                query: { page: currentPage - 1 }
                            }" class="page-link">
                                <span class="page-link" id="prev">&lt;&lt;Prev</span>
                            </router-link>
                        </li>
                        <li v-else class="page-item disabled">
                            <router-link :to="{
                                path: '/auditorias/pedidos',
                                query: { page: currentPage - 1 }
                            }" class="page-link">
                                <span class="page-link" id="prev">&lt;&lt;Prev</span>
                            </router-link>
                        </li>
                     <!-- Numbers -->
                        <router-link v-if="currentPage !== 1" :to="{ path: '/auditorias/pedidos', query: { page: 1 } }"
                            class="page-link"> First                        
                        </router-link>
                        <router-link v-else :to="{ path: '/auditorias/pedidos', query: { page: 1 } }"
                            class="page-link disabled"> First                        
                        </router-link>
                        <li v-for="page in visiblePages" :key="page"
                            :class="['page-item', { active: page === currentPage }]">
                            <router-link v-if="page !== currentPage"
                                :to="{ path: '/auditorias/pedidos', query: { page } }" class="page-link">
                                {{ page }}
                            </router-link>
                            <span v-else class="page-link active">{{ page }}</span>
                        </li>
                        <router-link v-if="currentPage !== totalPages" :to="{ path: '/auditorias/pedidos', query: { page: totalPages } }"
                            class="page-link"> Last
                        </router-link>
                        <router-link v-else :to="{ path: '/auditorias/pedidos', query: { page: totalPages } }"
                            class="page-link disabled"> Last
                        </router-link>
                        <!-- Next Button -->
                        <li v-if="currentPage == totalPages" class="page-item disabled">
                            <router-link :to="{
                                path: '/auditorias/pedidos',
                                query: { page: currentPage + 1 }
                            }" class="page-link">
                                <span class="page-link" id="next">Next >></span>
                            </router-link>
                        </li>
                        <li v-else class="page-item">
                            <router-link :to="{
                                path: '/auditorias/pedidos',
                                query: { page: currentPage + 1 }
                            }" class="page-link">
                                <span class="page-link" id="next">Next >></span>
                            </router-link>
                        </li>
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
    background-color: #825A32;
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

    background-color: #D7A871;
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
    font-family: Poppins, sans-serif;
    font-weight: 500;
    margin-inline: 10px;
    width: 100%;
}

td {
    background-color: #fff;
    border: none;
    border-radius: 0%;
    font-family: Poppins, sans-serif;
    font-weight: 500;
    margin-inline: 10px;
    width: 100%;
}


input[type="checkbox"] {
    width: 20px;
    height: 20px;
    border: 2px solid #000;
}

input[type="checkbox"]:focus {
    box-shadow: none !important;
}

input[type="checkbox"]:checked {
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
.active{
    color: lightblue;
    font-weight: 600;
    font-size: 20px;
}
.disabled{
    opacity: 0.5;
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
    background-color: #D7A871;
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

.download:hover {
    transform: scale(1.05);
    ;
}

.actions:hover {
    transform: rotate(5deg) scale(1.4);
}
</style>