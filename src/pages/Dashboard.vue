<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
import Estatistica from '../components/Estatistica.vue'
import ChartAuditorias from '../components/ChartAuditorias.vue'
import { onMounted, ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { fetchAuditorias, fetchAuditoriasSimple } from '@/services/auditoriasService'
import { fetchUsers } from '@/services/userService'

const series = ref([
  {
    name: 'Auditorias',
    data: [45, 52, 38, 24, 33, 26, 21],
  },
])

const chartOptions = ref({
  chart: {
    id: 'auditorias-chart',
    toolbar: {
      show: false,
    },
  },
  xaxis: {
    categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
  },
  colors: ['#008FFB'],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
})

const series_pizza = ref<number[]>([])
const labels = ref<string[]>([])
const workersCount = ref(0)
const auditoriasCount = ref(0)
const auditoriasAndamentoCount = ref(0)
const auditoriasTerminadasCount = ref(0)

async function getLocalidade(lat: number, lng: number): Promise<string> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
    )
    const data = await res.json()
    // Pega cidade, vila ou aldeia (fallbacks)
    return data.address.city || data.address.town || data.address.village || 'Desconhecido'
  } catch (err) {
    console.error('Erro no reverse geocoding', err)
    return 'Desconhecido'
  }
}

async function getNumberOfWorkers() {
  const response = await fetchUsers()
  workersCount.value = response.length
}
async function getNumberOfAuditorias() {
  const response = await fetchAuditorias()
  auditoriasCount.value = response.length

  auditoriasAndamentoCount.value = 0
  auditoriasTerminadasCount.value = 0

  for (const auditoria of response) {
    if (auditoria.status === 1) {
      auditoriasAndamentoCount.value++
    } else if (auditoria.status === 2) {
      auditoriasTerminadasCount.value++
    }
  }
}

onMounted(async () => {
  const auditorias = await fetchAuditoriasSimple()

  // 4. Obter localidade para cada auditoria (limitar para evitar excesso de chamadas)
  const locais: string[] = []
  for (const aud of auditorias) {
    const local = await getLocalidade(aud.lat, aud.lng)
    locais.push(local)
  }

  // 5. Agrupar por localidade e contar
  const contagemLocais = locais.reduce(
    (acc, local) => {
      acc[local] = (acc[local] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // 6. Preparar dados para o gráfico
  labels.value = Object.keys(contagemLocais)
  series_pizza.value = Object.values(contagemLocais)

  getNumberOfWorkers()
  getNumberOfAuditorias()
})
</script>

<template>
  <div class="dashboard-container">
    <Navbar :page="0" />
    <div class="information-container p-4">
      <h2 class="mb-4 fw-bold title">Dashboard</h2>
      <div class="graphs-container">
        <div class="top">
          <div class="row top-left">
            <div class="box workers">
              <div class="box-title">Trabalhadores</div>
              <div class="box-counter">{{ workersCount }}</div>
            </div>
            <div class="box totais">
              <div class="box-title">Total</div>
              <div class="box-counter">{{ auditoriasCount }}</div>
            </div>
            <div class="box andamento">
              <div class="box-title">Em Andamento</div>
              <div class="box-counter">{{ auditoriasAndamentoCount }}</div>
            </div>
            <div class="box finalizadas">
              <div class="box-title">Terminadas</div>
              <div class="box-counter">{{ auditoriasTerminadasCount }}</div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="row bottom-left">
            <VueApexCharts
              type="pie"
              :series="series_pizza"
              :options="{
                labels: labels,
                responsive: [
                  {
                    breakpoint: 480,
                    options: {
                      legend: {
                        position: 'bottom',
                        horizontalAlign: 'center',
                        floating: false,
                        offsetY: 0,
                        height: undefined,
                        showForSingleSeries: true,
                        show: true,
                        fontSize: '14px',
                        labels: {
                          useSeriesColors: true,
                        },
                        markers: {
                          width: 12,
                          height: 12,
                        },
                        itemMargin: {
                          horizontal: 10,
                          vertical: 5,
                        },
                      },
                    },
                  },
                ],
              }"
              width="550"
            />
          </div>
          <div class="row bottom-right">
            <VueApexCharts type="line" :series="series" :options="chartOptions" width="450" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  overflow-x: hidden;
  display: flex;
  background-color: #f1f1f1;
}
.information-container {
  display: flex;
  flex-direction: column;
  /* margin-left: 45px;
  margin-top: 55px; */
  width: 100%;
  /* background-color: blueviolet; */
}

.title {
  font-family: Poppins, sans-serif;
  font-weight: 600;
}
.sub-title {
  font-family: Poppins, sans-serif;
  font-weight: 500;
  font-size: larger;
}

.graphs-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.top {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50%;
}
.bottom {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}

.top-left {
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-between;
  width: 100%;
  /* background-color: aquamarine; */
  /* gap: 10rem; */
}

.top-left .box {
  width: 300px;
  height: 150px;
  padding: 10px;
}

.top-left .workers {
  background-color: #fff;
  font-family: Poppins, sans-serif;
  border-radius: 5px;
}
.box-title {
  font-size: medium;
  padding-inline: 10px;
  color: rgba(179, 179, 179, 1);
}
.box-counter {
  text-align: start;
  padding-inline: 10px;
  padding-top: 40px;

  font-size: 40px;
}

.top-left .totais {
  background-color: #fff;
  width: 300px;
  height: 150px;
  font-family: Poppins, sans-serif;
  border-radius: 5px;
}
.top-left .andamento {
  background-color: #fff;
  width: 300px;
  height: 150px;
  font-family: Poppins, sans-serif;
  border-radius: 5px;
}
.top-left .finalizadas {
  background-color: #fff;
  width: 300px;
  height: 150px;
  font-family: Poppins, sans-serif;
  border-radius: 5px;
}

.bottom {
  display: flex;
  flex-direction: row;
}

.bottom-left {
  background-color: red;
  width: 50%;
}
.bottom-right {
  background-color: blue;
  width: 50%;
}
</style>
