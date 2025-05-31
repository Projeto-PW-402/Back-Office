<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Navbar from '../components/Navbar.vue'
import { GoogleMap, CustomMarker } from 'vue3-google-map'
import { Pin, XSquareIcon } from 'lucide-vue-next'
import {
  fetchAuditoriaById,
  fetchAuditorias,
  fetchAuditoriasSimple,
} from '@/services/auditoriasService'
import type { Auditoria } from '@/models/Auditoria'

interface AuditoriaSimple {
  id: number
  lat: number
  lng: number
}

const showInfo = ref(false)
const infoContent = ref<Auditoria | null>(null)
const auditorias = ref<AuditoriaSimple[]>([])

async function getCoords(id: number) {
  const response = await fetchAuditoriaById(id)
  const coords = { lat: response['lat'], lng: response['lng'] }
  // console.log(response)
  console.log(coords)
  return coords
}

const bragaCoords = { lat: 41.5454, lng: -8.4265 }
const markerOptions = {
  position: { lat: 41.56764133169368, lng: -8.3550856920436 },
  label: 'Auditoria',
  title: 'Teste',
}

async function onMarkerClick(id: number) {
  const auditoria = await fetchAuditoriaById(id)
  infoContent.value = auditoria
  showInfo.value = true
}

function closeInfo() {
  showInfo.value = false
}

function getEstadoString(status?: number) {
  if (status === undefined || status === null) {
    return ''
  }
  switch (status) {
    case -1:
      return 'Rejeitada'
    case 0:
      return 'Em Espera'
    case 1:
      return 'Aceite'
    case 2:
      return 'Terminada'
    default:
      break
  }
}

onMounted(async () => {
  auditorias.value = await fetchAuditoriasSimple()
})
</script>

<template>
  <div class="main-container">
    <Navbar :page="1" />
    <div class="frame">
      <GoogleMap
        api-key="AIzaSyD9Qzw39nKxgrSMlqh7HMxuw24cZGMDACU"
        style="width: 100%; height: 100dvh"
        :center="bragaCoords"
        :zoom="10"
      >
        <CustomMarker
          v-for="aud in auditorias"
          :key="aud.id"
          :options="{ position: { lat: aud.lat, lng: aud.lng }, anchorPoint: 'CENTER' }"
          @click="() => onMarkerClick(aud.id)"
        >
          <div class="marker-container">
            <div class="marker-label">{{ aud.id }}</div>
            <Pin color="white" />
          </div>
          <!-- marcador visual -->
        </CustomMarker>
      </GoogleMap>
      <!-- Janela de info simples -->
      <div v-if="showInfo" class="info-window">
        <button @click="closeInfo" class="close-btn">
          <XSquareIcon />
        </button>
        <div class="title">{{ infoContent?.nome }}</div>
        <div class="info-container">
          <div class="status">Estado: {{ getEstadoString(infoContent?.status) }}</div>
          <div class="date" v-if="infoContent?.status == undefined"></div>
          <div class="date" v-else-if="infoContent?.status <= 0">
            Data de Reporte: {{ infoContent?.date }}
          </div>
          <div class="date" v-else>Data de Inicio: {{ infoContent?.date }}</div>
          <div class="tipo">Descrição: {{ infoContent?.descricao }}</div>
        </div>
        <div class="reporter-info">
          <div class="dname">Nome: {{ infoContent?.dnome }}</div>
          <div class="demail">Email: {{ infoContent?.demail }}</div>
          <div class="dcontacto">Nome: {{ infoContent?.dcontacto }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-container {
  display: flex;
  flex-direction: row;
}
.frame {
  width: 100%;
  height: 100dvh;
  position: relative;
}
.marker-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.marker-label {
  font-family: Poppins, sans-serif;
  font-size: 1.1rem;
  color: white;
}

.info-window {
  position: absolute;
  top: 20px;
  left: 20px;
  background: white;
  border-radius: 8px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  min-width: 400px;
  z-index: 1000;
}

.close-btn {
  position: absolute;
  right: 10px;
  top: 5px;
  background: transparent;
  border: none;
  font-weight: bold;
  cursor: pointer;
}
</style>
