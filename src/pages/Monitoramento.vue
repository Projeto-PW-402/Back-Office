<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Navbar from '../components/Navbar.vue'
import { GoogleMap, CustomMarker } from 'vue3-google-map'
import { Pin, CircleX } from 'lucide-vue-next'
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

function randomMinus10Or10() {
  return Math.random() < 0.5 ? -10 : 10
}

function riscoNumberToString(nivel?: number) {
  switch (nivel) {
    case 0:
      return 'Sem Nivel Atribuido'
    default:
      return nivel
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
            <Pin color="white" :style="{ transform: `rotate(${randomMinus10Or10()}deg)` }" />
          </div>
          <!-- marcador visual -->
        </CustomMarker>
      </GoogleMap>
      <!-- Janela de info simples -->
      <transition name="fade-slide">
        <div v-if="showInfo" class="info-window">
          <button @click="closeInfo" class="close-btn">
            <CircleX class="icon" fill="white" />
          </button>
          <div class="title">{{ infoContent?.nome }}</div>
          <div class="info-container">
            <div class="sub-title">Informação</div>
            <div class="data">
              Estado: <span>{{ getEstadoString(infoContent?.status) }}</span>
            </div>
            <div class="data" v-if="infoContent?.status == undefined"></div>
            <div class="data" v-else-if="infoContent?.status <= 0">
              Data de Reporte: <span>{{ infoContent?.date }}</span>
            </div>
            <div class="data" v-else>
              Data de Inicio: <span>{{ infoContent?.date }}</span>
            </div>
            <div class="data">
              Descrição: <span>{{ infoContent?.descricao }}</span>
            </div>
            <div class="data data-risco">
              Nivel de Risco:
              <span v-if="infoContent?.risco == undefined" :style="{ color: 'red' }"></span>
              <span v-else-if="infoContent?.risco > 3" :style="{ color: 'red' }">{{
                riscoNumberToString(infoContent?.risco)
              }}</span>
              <span
                v-else-if="infoContent?.risco < 3 && infoContent?.risco > 0"
                :style="{ color: 'green' }"
                >{{ riscoNumberToString(infoContent?.risco) }}</span
              >
              <span v-else-if="infoContent?.risco == 0" :style="{ color: 'black' }"
                >-- {{ riscoNumberToString(infoContent?.risco) }} --</span
              >
              <span v-else :style="{ color: 'orange' }">{{
                riscoNumberToString(infoContent?.risco)
              }}</span>
            </div>
          </div>
          <div class="reporter-info">
            <div class="sub-title">Informação do Notificador</div>
            <div class="data">
              Nome: <span>{{ infoContent?.dnome }}</span>
            </div>
            <div class="data">
              Email: <span> {{ infoContent?.demail }}</span>
            </div>
            <div class="data">
              Nome: <span>{{ infoContent?.dcontacto }}</span>
            </div>
          </div>
        </div>
      </transition>
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
  top: calc(50% - 500px / 2);
  left: 20px;
  background: white;
  border-radius: 3px;
  padding: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  max-width: 450px;
  min-width: 450px;
  z-index: 1000;

  display: flex;
  flex-direction: column;
  justify-content: baseline;
  align-items: baseline;
  gap: 5px;
}

.title {
  font-family: 'Courier New', Courier, monospace;
  letter-spacing: 1px;
  font-size: x-large;
  font-weight: 600;
  align-self: center;
}

.info-container {
  font-family: Poppins, monospace;
  font-size: large;
  font-weight: 500;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.info-container .sub-title {
  text-align: center;
}

.reporter-info {
  padding-top: 10px;
  font-family: Poppins, monospace;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.reporter-info .sub-title {
  text-align: center;
  font-size: large;
  font-weight: 600;
}

.data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: baseline;

  font-size: large;
  font-weight: 600;
}

.data span {
  font-size: large;
  font-weight: 300;
}
.data-risco span {
  font-size: larger;
  font-weight: 500;
}

.close-btn {
  position: absolute;
  right: -15px;
  top: -12.5px;
  background: transparent;
  border: none;
  font-weight: bold;
  cursor: pointer;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
