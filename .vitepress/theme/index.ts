import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import ReportChart from './components/ReportChart.vue'
import 'virtual:group-icons.css'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    enhanceAppWithTabs(app)
    app.component('ReportChart', ReportChart)
  },
} satisfies Theme
