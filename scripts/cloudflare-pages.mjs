#!/usr/bin/env node

import { spawnSync } from 'node:child_process'

import { getSecretActions, parseCloudflareArgs } from './cloudflare-pages-utils.mjs'

const options = parseCloudflareArgs({
  argv: process.argv.slice(2),
  env: process.env,
})

const { mode, projectName } = options

const help = () => {
  console.log(`
Usage:
  npm run setup:cloudflare -- --project my-report
  npm run setup:cloudflare -- --project my-report --private
  npm run deploy -- --project my-report

Options:
  --project, --handle   Cloudflare Pages project name. This becomes https://<project>.pages.dev
  --private             Protect the report and prompt securely for REPORT_PASSWORD
  --realm               Optional browser login prompt label
  --skip-deploy         Create/configure the project without deploying
  --password            Legacy shortcut. Prefer --private or REPORT_PASSWORD to avoid shell history.

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

if (options.helpRequested) {
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

  for (const action of getSecretActions(options)) {
    if (action.warn) {
      console.warn(`Warning: ${action.warn}`)
    }

    if (action.mode === 'interactive') {
      console.log(`Setting ${action.name} secret. Wrangler will prompt for the value...`)
      run('npx', ['wrangler', 'pages', 'secret', 'put', action.name, '--project-name', projectName])
    } else {
      console.log(`Setting ${action.name} secret...`)
      run('npx', ['wrangler', 'pages', 'secret', 'put', action.name, '--project-name', projectName], {
        input: `${action.value}\n`,
      })
    }
  }

  if (options.skipDeploy) {
    console.log(`Configured ${projectName}. Deploy later with: npm run deploy -- --project ${projectName}`)
    process.exit(0)
  }
}

console.log('Building report...')
run('npm', ['run', 'build'])

console.log(`Deploying to Cloudflare Pages project "${projectName}"...`)
run('npx', ['wrangler', 'pages', 'deploy', '.vitepress/dist', '--project-name', projectName])

console.log(`Live URL: https://${projectName}.pages.dev`)
