<script setup lang="ts">
import { Pencil, Trash2Icon, X } from 'lucide-vue-next';
import Navbar from '../components/Navbar.vue'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import NewMaterial from '@/subpages/NewMaterial.vue';

const options = [];
const selected = ref<number[]>([]);
const perPage = ref(10);
const route = useRoute();
const router = useRouter();

const w_screen = ref(window.innerWidth)
const h_screen = ref(window.innerHeight)
sizePerWindow(h_screen.value)

function updateSize() {
  w_screen.value = window.innerWidth
  h_screen.value = window.innerHeight
}

function sizePerWindow(newHeight: number) {
  if (newHeight < 864) {
    perPage.value = 5
  }
  else if (newHeight < 956) {
    perPage.value = 7
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
  return selected.value.length === materiais.value.length;
});

const toggleSelectAll = () => {
  if (selectAll.value) {
    selected.value = [];
  } else {
    selected.value = materiais.value.map(material => material.id);
  }
};

const paginatedMaterials = computed(() => {
  const start = (currentPage.value - 1) * perPage.value;
  return materiais.value.slice(start, start + perPage.value);
});

const selectedPage = computed(() => {
  const page = route.query.page
  const pageStr = Array.isArray(page) ? page[0] : page
  return parseInt(pageStr || '1')
})

const materiais = ref([
  { id: 1, nome: "Tinta Acrílica", tipo: "Material", descricao: "Tinta branca para interiores", quantidade: 10, preco: "15.50€" },
  { id: 2, nome: "Pincel Médio", tipo: "Ferramenta", descricao: "Pincel de cerdas sintéticas", quantidade: 25, preco: "3.20€" },
  { id: 3, nome: "Rolo de Pintura", tipo: "Ferramenta", descricao: "Rolo para superfícies lisas", quantidade: 12, preco: "5.50€" },
  { id: 4, nome: "Fita de Pintura", tipo: "Acessório", descricao: "Fita adesiva azul, 50m", quantidade: 18, preco: "2.00€" },
  { id: 5, nome: "Lixa Grão 120", tipo: "Material", descricao: "Lixa fina para acabamentos", quantidade: 30, preco: "0.80€" },
  { id: 6, nome: "Betume", tipo: "Material", descricao: "Betume para madeira", quantidade: 6, preco: "4.70€" },
  { id: 7, nome: "Espátula Inox", tipo: "Ferramenta", descricao: "Espátula 10cm cabo plástico", quantidade: 14, preco: "3.60€" },
  { id: 8, nome: "Luvas Nitrilo", tipo: "Proteção", descricao: "Luvas descartáveis, tamanho M", quantidade: 100, preco: "0.15€" },
  { id: 9, nome: "Óculos de Proteção", tipo: "Proteção", descricao: "Óculos antiembaciamento", quantidade: 20, preco: "6.90€" },
  { id: 10, nome: "Máscara FFP2", tipo: "Proteção", descricao: "Máscara de proteção respiratória", quantidade: 50, preco: "1.10€" },
  { id: 11, nome: "Tinta Spray Preta", tipo: "Material", descricao: "Spray para metais e plásticos", quantidade: 22, preco: "4.30€" },
  { id: 12, nome: "Pano de Microfibra", tipo: "Acessório", descricao: "Pano de limpeza reutilizável", quantidade: 40, preco: "1.50€" },
  { id: 13, nome: "Cola de Madeira", tipo: "Material", descricao: "Cola branca resistente à água", quantidade: 8, preco: "3.90€" },
  { id: 14, nome: "Serrote Japonês", tipo: "Ferramenta", descricao: "Serrote de precisão com lâmina fina", quantidade: 5, preco: "12.75€" },
  { id: 15, nome: "Trincha Angular", tipo: "Ferramenta", descricao: "Trincha para cantos difíceis", quantidade: 10, preco: "3.85€" },
  { id: 16, nome: "Desengordurante", tipo: "Produto Químico", descricao: "Limpador para superfícies gordurosas", quantidade: 15, preco: "2.90€" },
  { id: 17, nome: "Silicone Branco", tipo: "Material", descricao: "Selante para juntas", quantidade: 16, preco: "4.40€" },
  { id: 18, nome: "Pistola de Silicone", tipo: "Ferramenta", descricao: "Aplicador para tubos de selante", quantidade: 7, preco: "6.20€" },
  { id: 19, nome: "Lanterna LED", tipo: "Acessório", descricao: "Lanterna portátil com 3 modos", quantidade: 9, preco: "9.80€" },
  { id: 20, nome: "Escada Telescópica", tipo: "Equipamento", descricao: "Escada ajustável até 3m", quantidade: 3, preco: "74.99€" },
  { id: 21, nome: "Extensão Elétrica", tipo: "Acessório", descricao: "Cabo com 5 metros, 3 tomadas", quantidade: 11, preco: "8.50€" },
  { id: 22, nome: "Tira-Ferrugem", tipo: "Produto Químico", descricao: "Removedor de ferrugem para metais", quantidade: 13, preco: "5.25€" },
  { id: 23, nome: "Disco de Corte", tipo: "Ferramenta", descricao: "Disco para rebarbadora 115mm", quantidade: 26, preco: "1.20€" },
  { id: 24, nome: "Chave de Fendas", tipo: "Ferramenta", descricao: "Chave cruzada magnética", quantidade: 18, preco: "2.10€" },
  { id: 25, nome: "Martelo de Borracha", tipo: "Ferramenta", descricao: "Martelo para assentamento sem marcas", quantidade: 6, preco: "7.30€" },
  { id: 26, nome: "Capacete de Segurança", tipo: "Proteção", descricao: "Capacete com ajuste rápido", quantidade: 4, preco: "11.40€" }
])


const totalPages = computed(() => Math.ceil(materiais.value.length / perPage.value))
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



const isMenuEnabled = computed(() => {
  const add = route.query.add
  if (add === undefined || add === 'false') {
    return false
  }else {
    return true
  }
})

const addMaterial = ref(false)
const isModalActive = ref(isMenuEnabled.value)
console.log('isModalActive:', isModalActive.value)

watch(() => route.query.add, (newAdd) => {
  isModalActive.value = newAdd !== 'false' && newAdd !== undefined;
  
  });

function handleClick(){
  addMaterial.value = true
  isModalActive.value = true
  router.push({ path: '/materiais', query: { add: 'true' } });
}

</script>
<template>
  <div class="materiais-container" :style="{ filter: isModalActive ? 'blur(5px)' : 'blur(0)'  }">
    <Navbar :page="4" :disable=isModalActive />
    <div class="container-fluid p-4 bg-light min-vh-100">
      <h2 class="mb-4 fw-bold" id="title">Materiais</h2>
      <div class="table-responsive bg-white ">
        <table class="table mb-0">
          <thead class="text-center align-middle">
            <tr>
              <th scope="col">
                <input type="checkbox" class="form-check-input" :checked="selectAll" @change="toggleSelectAll" />
              </th>
              <th scope="col">Nome</th>
              <th scope="col">Tipo</th>
              <th scope="col" id="descricao">Descrição</th>
              <th scope="col">Quantidade</th>
              <th scope="col">Ação</th>
              <th scope="col">Preço</th>
            </tr>
          </thead>
          <tbody class="text-center align-middle">
            <tr v-for="material in paginatedMaterials" :key="material.id">
              <td :style="{ backgroundColor: selected.includes(material.id) ? 'lightblue' : 'white' }">
                <input type="checkbox" class="form-check-input" :value="material.id" v-model="selected" />
              </td>
              <td :style="{ backgroundColor: selected.includes(material.id) ? 'lightblue' : 'white' }">{{
                material.nome }}</td>
              <td :style="{ backgroundColor: selected.includes(material.id) ? 'lightblue' : 'white' }">{{
                material.tipo }}</td>
              <td :style="{ backgroundColor: selected.includes(material.id) ? 'lightblue' : 'white' }">{{
                material.descricao }}</td>
              <td :style="{ backgroundColor: selected.includes(material.id) ? 'lightblue' : 'white' }">{{
                material.quantidade }}</td>
              <td class="actions-container"
                :style="{ backgroundColor: selected.includes(material.id) ? 'lightblue' : 'white' }">
                <button class="actions" style="color:red;">
                  <Trash2Icon width="20px" height="20px" />
                </button>
                <button class="actions" style="color:orange;">
                  <Pencil width="20px" height="20px" />
                </button>
              </td>
              <td :style="{ backgroundColor: selected.includes(material.id) ? 'lightblue' : 'white' }">{{
                material.preco }}</td>
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
              path: '/materiais',
              query: { page: currentPage - 1 }
            }" class="page-link">
              <span class="page-link" id="prev">&lt;&lt;Prev</span>
            </router-link>
          </li>
          <li v-else class="page-item disabled">
            <router-link :to="{
              path: '/materiais',
              query: { page: currentPage - 1 }
            }" class="page-link">
              <span class="page-link" id="prev">&lt;&lt;Prev</span>
            </router-link>
          </li>
          <!-- Numbers -->
          <router-link v-if="currentPage !== 1" :to="{ path: '/materiais', query: { page: 1 } }" class="page-link">
            First
          </router-link>
          <router-link v-else :to="{ path: '/materiais', query: { page: 1 } }" class="page-link disabled"> First
          </router-link>
          <li v-for="page in visiblePages" :key="page" :class="['page-item', { active: page === currentPage }]">
            <router-link v-if="page !== currentPage" :to="{ path: '/materiais', query: { page } }" class="page-link">
              {{ page }}
            </router-link>
            <span v-else class="page-link active">{{ page }}</span>
          </li>
          <router-link v-if="currentPage !== totalPages" :to="{ path: '/materiais', query: { page: totalPages } }"
            class="page-link"> Last
          </router-link>
          <router-link v-else :to="{ path: '/materiais', query: { page: totalPages } }" class="page-link disabled"> Last
          </router-link>
          <!-- Next Button -->
          <li v-if="currentPage == totalPages" class="page-item disabled">
            <router-link :to="{
              path: '/materiais',
              query: { page: currentPage + 1 }
            }" class="page-link">
              <span class="page-link" id="next">Next >></span>
            </router-link>
          </li>
          <li v-else class="page-item">
            <router-link :to="{
              path: '/materiais',
              query: { page: currentPage + 1 }
            }" class="page-link">
              <span class="page-link" id="next">Next >></span>
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- Botão Adicionar -->
      <div class="text-end mt-3">
        <button class="btn btn-warning" id="adicionar" @click=handleClick >Adicionar</button>
      </div>
    </div>
  </div>
  <NewMaterial :visible="isModalActive"/>
</template>

<style scoped>
.materiais-container {
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
  transition:all 0.2s cubic-bezier(0.47, 0, 0.745, 0.715);
}

#adicionar:hover {
  background-color: #d7a871;
  color: white;
  cursor: pointer;
  transform: scale(1.05);
}
</style>