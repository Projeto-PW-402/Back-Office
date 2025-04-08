<script setup lang="ts">
import {ref} from 'vue'

const barChatSeries = ref([
  {
    name: 'Auditorias',
    data: [5, 10, 7]
  }
])

const barChartOptions = ref({
  xaxis:{
    categories: ['Local 1', 'Local 2', 'Local 3']
  }
})

</script>

<template>
  <div>
    <apexchart width="500" type="bar" :options="barChartOptions" :series="barChatSeries"></apexchart>
  </div>
</template>

<style scoped>

</style>