<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { buildChartDataset, buildChartOptions } from '../lib/report-chart.mjs'

const props = defineProps({
  type: {
    type: String,
    default: 'bar',
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  labels: {
    type: Array,
    required: true,
  },
  values: {
    type: Array,
    required: true,
  },
  seriesLabel: {
    type: String,
    default: 'Value',
  },
  unit: {
    type: String,
    default: '',
  },
  colors: {
    type: Array,
    default: () => [],
  },
  horizontal: {
    type: Boolean,
    default: false,
  },
  stacked: {
    type: Boolean,
    default: false,
  },
  height: {
    type: Number,
    default: 320,
  },
})

const canvas = ref(null)
let chart
let ChartConstructor

const chartData = computed(() =>
  buildChartDataset({
    labels: props.labels,
    values: props.values,
    label: props.seriesLabel,
    colors: props.colors,
    type: props.type,
  }),
)

const chartOptions = computed(() =>
  buildChartOptions({
    type: props.type,
    title: props.title,
    unit: props.unit,
    horizontal: props.horizontal,
    stacked: props.stacked,
  }),
)

const chartAreaStyle = computed(() => ({
  height: `${Math.max(props.height, 220)}px`,
}))

async function renderChart() {
  if (!canvas.value || typeof window === 'undefined')
    return

  if (!ChartConstructor) {
    const chartModule = await import('chart.js/auto')
    ChartConstructor = chartModule.default
  }

  chart?.destroy()
  chart = new ChartConstructor(canvas.value, {
    type: props.type,
    data: chartData.value,
    options: chartOptions.value,
  })
}

onMounted(renderChart)

watch(
  () => [
    props.type,
    props.title,
    props.unit,
    props.horizontal,
    props.stacked,
    props.height,
    props.labels,
    props.values,
    props.colors,
  ],
  renderChart,
  { deep: true },
)

onBeforeUnmount(() => {
  chart?.destroy()
})
</script>

<template>
  <figure class="report-chart">
    <div v-if="description" class="report-chart__description">
      {{ description }}
    </div>
    <div class="report-chart__canvas" :style="chartAreaStyle">
      <canvas ref="canvas" :aria-label="title || description || 'Report chart'" role="img" />
    </div>
  </figure>
</template>

<style scoped>
.report-chart {
  position: relative;
  width: 100%;
  margin: 24px 0;
  padding: 18px 18px 16px;
  border: 1px solid rgba(100, 116, 139, 0.22);
  border-radius: 8px;
  background: color-mix(in srgb, var(--vp-c-bg) 94%, var(--vp-c-brand-1) 6%);
}

.report-chart__description {
  max-width: 720px;
  margin: 0 0 10px;
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 1.45;
}

.report-chart__canvas {
  position: relative;
  width: 100%;
}

.report-chart canvas {
  width: 100% !important;
  height: 100% !important;
}
</style>
