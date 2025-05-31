<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
import Estatistica from '../components/Estatistica.vue'
import ChartAuditorias from '../components/ChartAuditorias.vue'
import { onMounted, ref } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { fetchAuditoriasSimple } from '@/services/auditoriasService'

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
})
</script>

<template>
  <div class="dashboard-container">
    <Navbar :page="0" />
    <div class="container information-container">
      <div class="row">Estatistica</div>
      <div class="row" style="max-width: 600px; margin: auto">
        <VueApexCharts type="line" :series="series" :options="chartOptions" width="450" />
      </div>
      <div class="row" style="margin: auto">
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
    </div>
  </div>
</template>

<style scoped>
.dashboard-container {
  overflow-x: hidden;
  display: flex;
}
.information-container {
  display: flex;
  margin-left: 45px;
  margin-top: 55px;
}
/* #chart-auditorias{
        background-color: aliceblue;
        transform: scale(1);
        margin-left: 15rem;
        margin-top: 10rem;
    } */
</style>
