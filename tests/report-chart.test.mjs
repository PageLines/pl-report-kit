import assert from 'node:assert/strict'
import test from 'node:test'

import {
  buildChartDataset,
  buildChartOptions,
  reportChartPalette,
} from '../.vitepress/theme/lib/report-chart.mjs'

test('buildChartDataset coerces values and fills missing labels', () => {
  const dataset = buildChartDataset({
    labels: ['Client calls'],
    values: [46, '31', null, 'not-a-number'],
    label: 'Median delay',
  })

  assert.deepEqual(dataset.labels, ['Client calls', 'Series 2', 'Series 3', 'Series 4'])
  assert.deepEqual(dataset.datasets[0].data, [46, 31, 0, 0])
  assert.equal(dataset.datasets[0].label, 'Median delay')
})

test('buildChartDataset cycles through the report chart palette', () => {
  const dataset = buildChartDataset({
    labels: ['A', 'B', 'C', 'D', 'E', 'F'],
    values: [1, 2, 3, 4, 5, 6],
  })

  assert.equal(dataset.datasets[0].backgroundColor[0], reportChartPalette[0])
  assert.equal(dataset.datasets[0].backgroundColor[5], reportChartPalette[0])
})

test('buildChartOptions returns report defaults with unit-aware tooltip text', () => {
  const options = buildChartOptions({
    title: 'Follow-up delay',
    unit: 'hours',
    type: 'bar',
    horizontal: true,
  })

  const label = options.plugins.tooltip.callbacks.label({
    dataset: { label: 'Median delay' },
    parsed: { x: 46 },
  })

  assert.equal(options.indexAxis, 'y')
  assert.equal(options.maintainAspectRatio, false)
  assert.equal(options.plugins.title.text, 'Follow-up delay')
  assert.equal(label, 'Median delay: 46 hours')
})

test('buildChartOptions uses composition defaults for doughnut charts', () => {
  const options = buildChartOptions({
    title: 'Client mix',
    type: 'doughnut',
  })

  assert.equal(options.plugins.legend.display, true)
  assert.equal(options.plugins.legend.position, 'bottom')
  assert.equal(options.scales, undefined)
  assert.equal(options.cutout, '62%')
})
