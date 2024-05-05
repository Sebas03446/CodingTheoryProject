<script setup>
import { Bar } from "vue-chartjs";

const props = defineProps({
  chartData: {
    type: Object,
    required: true,
  },
});

onBeforeMount(() => {
  console.log("chartData", props.chartData);
});

</script>

<template>
  <div class="history-product">
    <Bar :data="chartData" />
  </div>
</template>

<style scoped>
.history-product {
  width: 100%;
  height: 400px;
}
</style>
