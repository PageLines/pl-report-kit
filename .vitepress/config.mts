import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    title: 'PL Report Kit',
    description: 'AI-ready research and strategic report framework',
    head: [
      ['meta', { name: 'robots', content: 'noindex, nofollow' }],
      ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
      ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
      ['link', { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap', rel: 'stylesheet' }],
    ],
    themeConfig: {
      nav: [
        { text: 'Report', link: '/' },
        { text: 'Map', link: '/overview' },
        { text: 'Strategy', link: '/report-kit-overview' },
        { text: 'Guide', link: '/GUIDE' },
      ],
      sidebar: [
        {
          text: 'Report',
          items: [
            { text: 'Executive Summary', link: '/' },
            { text: 'Kit Strategy', link: '/report-kit-overview' },
            { text: 'File Map', link: '/overview' },
            { text: 'News Log', link: '/news' },
            { text: 'Changelog', link: '/CHANGELOG' },
          ],
        },
        {
          text: 'Workspace',
          items: [
            { text: 'Source Records', link: '/records/' },
            { text: 'Research Notes', link: '/reference/research-notes' },
            { text: 'Evidence Matrix', link: '/reference/evidence-matrix' },
            { text: 'Questions', link: '/reference/questions' },
          ],
        },
        {
          text: 'Agent Guides',
          items: [
            { text: 'AI Workflow', link: '/docs/ai-workflow' },
            { text: 'Writing Guide', link: '/GUIDE' },
            { text: 'AGENTS.md', link: '/AGENTS' },
          ],
        },
      ],
      search: {
        provider: 'local',
      },
    },
    mermaid: {},
  })
)
