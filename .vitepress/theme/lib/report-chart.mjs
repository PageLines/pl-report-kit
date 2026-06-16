export const reportChartPalette = [
  '#2563eb',
  '#0f766e',
  '#b45309',
  '#7c3aed',
  '#be123c',
]

const defaultGridColor = 'rgba(100, 116, 139, 0.18)'
const defaultTextColor = '#334155'

const toNumber = (value) => {
  const number = Number(value)
  return Number.isFinite(number) ? number : 0
}

const normalizeLabels = (labels, count) =>
  Array.from({ length: count }, (_, index) => {
    const label = labels?.[index]
    return typeof label === 'string' && label.trim() ? label.trim() : `Series ${index + 1}`
  })

export function buildChartDataset({
  labels = [],
  values = [],
  label = 'Value',
  colors = reportChartPalette,
  type = 'bar',
} = {}) {
  const safeValues = Array.isArray(values) ? values.map(toNumber) : []
  const safeLabels = normalizeLabels(Array.isArray(labels) ? labels : [], safeValues.length)
  const safeColors = colors.length ? colors : reportChartPalette
  const backgroundColor = safeValues.map((_, index) => safeColors[index % safeColors.length])

  const dataset = {
    label,
    data: safeValues,
    backgroundColor,
    borderColor: backgroundColor,
    borderWidth: 1,
    borderRadius: 5,
    maxBarThickness: 42,
  }

  if (type === 'line') {
    dataset.fill = false
    dataset.tension = 0.32
    dataset.pointRadius = 4
    dataset.pointHoverRadius = 6
  }

  return {
    labels: safeLabels,
    datasets: [dataset],
  }
}

export function buildChartOptions({
  type = 'bar',
  title = '',
  unit = '',
  horizontal = false,
  stacked = false,
  textColor = defaultTextColor,
  gridColor = defaultGridColor,
} = {}) {
  const isCompositionChart = ['doughnut', 'pie', 'polarArea'].includes(type)
  const basePlugins = {
    title: {
      display: Boolean(title),
      text: title,
      align: 'start',
      color: textColor,
      font: {
        family: 'Inter, ui-sans-serif, system-ui, sans-serif',
        size: 15,
        weight: '600',
      },
      padding: {
        bottom: 14,
      },
    },
    legend: {
      display: isCompositionChart,
      position: 'bottom',
      labels: {
        color: textColor,
        boxWidth: 12,
        boxHeight: 12,
        padding: 16,
      },
    },
    tooltip: {
      callbacks: {
        label(context) {
          const seriesLabel = context.dataset?.label || 'Value'
          const rawValue = isCompositionChart
            ? context.parsed
            : horizontal
              ? context.parsed?.x
              : context.parsed?.y
          const value = toNumber(rawValue)
          const labelPrefix = isCompositionChart && context.label ? context.label : seriesLabel
          return unit ? `${labelPrefix}: ${value} ${unit}` : `${labelPrefix}: ${value}`
        },
      },
    },
  }

  if (isCompositionChart) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      cutout: type === 'doughnut' ? '62%' : undefined,
      animation: {
        duration: 180,
      },
      plugins: basePlugins,
    }
  }

  const valueAxis = horizontal ? 'x' : 'y'
  const categoryAxis = horizontal ? 'y' : 'x'

  return {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: horizontal ? 'y' : 'x',
    animation: {
      duration: 180,
    },
    plugins: basePlugins,
    scales: {
      [categoryAxis]: {
        stacked,
        grid: {
          display: false,
        },
        ticks: {
          color: textColor,
          font: {
            family: 'Inter, ui-sans-serif, system-ui, sans-serif',
          },
        },
      },
      [valueAxis]: {
        stacked,
        beginAtZero: true,
        grid: {
          color: gridColor,
        },
        ticks: {
          color: textColor,
          font: {
            family: 'Inter, ui-sans-serif, system-ui, sans-serif',
          },
          callback(value) {
            return unit ? `${value} ${unit}` : value
          },
        },
      },
    },
  }
}
