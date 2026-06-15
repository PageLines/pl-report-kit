#!/usr/bin/env node

import { spawnSync } from 'node:child_process'

const mode = process.argv[2]
const args = process.argv.slice(3)

const readArg = (names) => {
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i]
    const [key, value] = arg.split('=')
    if (names.includes(key)) {
      return value ?? args[i + 1]
    }
  }
  return ''
}

const hasFlag = (name) => args.includes(name)

const help = () => {
  console.log(`
Usage:
  npm run setup:cloudflare -- --project my-report [--password "secret"]
  npm run deploy -- --project my-report

Options:
  --project, --handle   Cloudflare Pages project name. This becomes https://<project>.pages.dev
  --password            Optional Basic Auth password for private reports
  --realm               Optional browser login prompt label
  --skip-deploy         Create/configure the project without deploying

Credentials:
  Use either "npx wrangler login" or set CLOUDFLARE_API_TOKEN.
  If your token has access to multiple accounts, also set CLOUDFLARE_ACCOUNT_ID.
`)
}

const run = (command, commandArgs, options = {}) => {
  const result = spawnSync(command, commandArgs, {
    encoding: 'utf8',
    stdio: options.input ? ['pipe', 'inherit', 'inherit'] : 'inherit',
    input: options.input,
    shell: process.platform === 'win32',
  })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

const runAllowFailure = (command, commandArgs) =>
  spawnSync(command, commandArgs, {
    encoding: 'utf8',
    stdio: 'pipe',
    shell: process.platform === 'win32',
  })

const projectName = readArg(['--project', '--handle']) || process.env.CLOUDFLARE_PROJECT_NAME
const password = readArg(['--password']) || process.env.REPORT_PASSWORD
const realm = readArg(['--realm']) || process.env.REPORT_REALM

if (!mode || hasFlag('--help') || hasFlag('-h')) {
  help()
  process.exit(mode ? 0 : 1)
}

if (!['setup', 'deploy'].includes(mode)) {
  console.error(`Unknown mode: ${mode}`)
  help()
  process.exit(1)
}

if (!projectName) {
  console.error('Missing --project. Example: npm run setup:cloudflare -- --project acme-strategy-report')
  process.exit(1)
}

if (mode === 'setup') {
  console.log(`Creating Cloudflare Pages project "${projectName}" if needed...`)
  const create = runAllowFailure('npx', [
    'wrangler',
    'pages',
    'project',
    'create',
    projectName,
    '--production-branch',
    'main',
  ])

  if (create.status !== 0) {
    const output = `${create.stdout}\n${create.stderr}`
    if (/already exists|name.*taken|duplicate/i.test(output)) {
      console.log(`Project "${projectName}" already exists. Continuing.`)
    } else {
      process.stdout.write(create.stdout)
      process.stderr.write(create.stderr)
      process.exit(create.status ?? 1)
    }
  }

  if (password) {
    console.log('Setting REPORT_PASSWORD secret...')
    run('npx', ['wrangler', 'pages', 'secret', 'put', 'REPORT_PASSWORD', '--project-name', projectName], {
      input: `${password}\n`,
    })
  }

  if (realm) {
    console.log('Setting REPORT_REALM secret...')
    run('npx', ['wrangler', 'pages', 'secret', 'put', 'REPORT_REALM', '--project-name', projectName], {
      input: `${realm}\n`,
    })
  }

  if (hasFlag('--skip-deploy')) {
    console.log(`Configured ${projectName}. Deploy later with: npm run deploy -- --project ${projectName}`)
    process.exit(0)
  }
}

console.log('Building report...')
run('npm', ['run', 'build'])

console.log(`Deploying to Cloudflare Pages project "${projectName}"...`)
run('npx', ['wrangler', 'pages', 'deploy', '.vitepress/dist', '--project-name', projectName])

console.log(`Live URL: https://${projectName}.pages.dev`)
