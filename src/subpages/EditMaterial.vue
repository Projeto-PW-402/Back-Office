<script setup lang="ts">
import { Material } from '@/models/Material'
import { fetchMaterialById, updateMaterial } from '@/services/materialService'
import { DiamondPlus, X } from 'lucide-vue-next'
import { onMounted, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const props = defineProps<{
  isModalVisible: boolean
}>()

const isVisible = ref(props.isModalVisible)
const route = useRoute()
const router = useRouter()
const emit = defineEmits(['material-added', 'material-edited'])

const nome = ref()
const tipo = ref()
const descricao = ref()
const quant = ref()
const preco = ref()
const materialVisible = ref<boolean>(true)

watchEffect(() => {
  const id = Number(route.query.id)
  const edit = route.query.edit
  isVisible.value = edit === 'true'

  if (!isNaN(id) && edit === 'true') {
    getMaterialById(id)
  }
})

async function getMaterialById(id: number) {
  try {
    const material = await fetchMaterialById(id)
    nome.value = material.nome
    tipo.value = material.tipo
    descricao.value = material.descricao
    quant.value = material.quant
    preco.value = material.preco
    materialVisible.value = material.visible
    console.log('Material:', material)
  } catch (error) {
    console.error('Erro ao buscar material:', error)
  }
}

async function editMaterial() {
  let isMaterialVisible = materialVisible
  if (quant.value < 0 || preco.value < 0) {
    alert('Quantidade e preço não podem ser negativos.')
    return
  }
  if (quant.value === 0) {
    isMaterialVisible.value = false
  }
  const material = new Material({
    nome: nome.value,
    tipo: tipo.value,
    descricao: descricao.value,
    quant: quant.value,
    preco: preco.value,
    visible: isMaterialVisible.value,
  })
  try {
    await updateMaterial(material.id, material)
    emit('material-edited')
    router.push({ path: '/materiais' })
  } catch (error) {
    console.error('Erro ao adicionar utilizador:', error)
  }
}

function closeEditModal() {
  isVisible.value = false
  // Alterar a query na URL para fechar o modal
  router.push({ path: '/materiais', query: { edit: 'false' } })
}
</script>
<template>
  <div class="main-container" :style="{ display: props.isModalVisible ? 'flex' : 'none' }">
    <div class="title">Editar Material</div>
    <div class="close" @click="closeEditModal"><X /></div>
    <form id="materialForm" @submit.prevent="editMaterial">
      <div class="name-container">
        <input type="text" id="name" v-model="nome" :placeholder="nome" />
        <label class="name-label" for="name">Nome</label>
      </div>
      <div class="middle-container">
        <div class="tipo-container">
          <input type="text" id="tipo" v-model="tipo" :placeholder="tipo" />
          <label class="tipo-label" for="tipo">Tipo</label>
        </div>
        <div class="quantidade-container">
          <input type="number" id="quantidade" v-model="quant" :placeholder="quant" />
          <label class="quantidade-label" for="quantidade">Quantidade</label>
        </div>
      </div>
      <div class="preco-container">
        <input type="number" id="preco" v-model="preco" :placeholder="preco" />
        <label class="preco-label" for="preco">Preço</label>
      </div>
      <div class="descricao-container">
        <input type="text" id="descricao" v-model="descricao" :placeholder="descricao" />
        <label class="descricao-label" for="descricao">Descrição</label>
      </div>
      <button type="submit">Update<DiamondPlus width="22" height="22" /></button>
    </form>
  </div>
</template>
<style scoped>
.main-container {
  user-select: none;
  position: absolute;
  top: calc(50% - 275px);
  left: calc(50% - 250px);
  width: 500px;
  height: 470px;
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

.middle-container {
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
.quantidade-container input {
  padding-inline: 10px;
}
.quantidade-container input:focus + .quantidade-label {
  color: #825a32;
}
.preco-container {
  display: flex;
  max-width: 53%;
  flex-direction: column-reverse;
}

.preco-container input {
  padding-inline: 10px;
}
.preco-container input:focus + .preco-label {
  color: #825a32;
}

.descricao-container {
  display: flex;
  flex-direction: column-reverse;
}
.descricao-container input {
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
