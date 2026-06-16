import assert from 'node:assert/strict'
import { test } from 'node:test'

import { getSecretActions, parseCloudflareArgs } from '../scripts/cloudflare-pages-utils.mjs'

test('parses setup options from flags and environment variables', () => {
  const options = parseCloudflareArgs({
    argv: ['setup', '--project', 'acme-report', '--private', '--realm', 'Acme report'],
    env: {
      REPORT_PASSWORD: 'env-password',
      CLOUDFLARE_ACCOUNT_ID: 'account-id',
    },
  })

  assert.equal(options.mode, 'setup')
  assert.equal(options.projectName, 'acme-report')
  assert.equal(options.privateReport, true)
  assert.equal(options.password, 'env-password')
  assert.equal(options.passwordSource, 'env')
  assert.equal(options.realm, 'Acme report')
  assert.equal(options.skipDeploy, false)
})

test('uses CLOUDFLARE_PROJECT_NAME when project flag is absent', () => {
  const options = parseCloudflareArgs({
    argv: ['deploy'],
    env: { CLOUDFLARE_PROJECT_NAME: 'env-report' },
  })

  assert.equal(options.mode, 'deploy')
  assert.equal(options.projectName, 'env-report')
})

test('plans an interactive REPORT_PASSWORD secret when --private has no password value', () => {
  const options = parseCloudflareArgs({
    argv: ['setup', '--project=client-report', '--private'],
    env: {},
  })

  assert.deepEqual(getSecretActions(options), [
    {
      name: 'REPORT_PASSWORD',
      mode: 'interactive',
      value: '',
      warn: '',
    },
  ])
})

test('plans piped secret input when REPORT_PASSWORD is supplied by environment', () => {
  const options = parseCloudflareArgs({
    argv: ['setup', '--project', 'client-report', '--private'],
    env: { REPORT_PASSWORD: 'env-password' },
  })

  assert.deepEqual(getSecretActions(options), [
    {
      name: 'REPORT_PASSWORD',
      mode: 'input',
      value: 'env-password',
      warn: '',
    },
  ])
})

test('keeps legacy --password support but marks it as discouraged', () => {
  const options = parseCloudflareArgs({
    argv: ['setup', '--project', 'client-report', '--password', 'cli-password'],
    env: {},
  })

  assert.deepEqual(getSecretActions(options), [
    {
      name: 'REPORT_PASSWORD',
      mode: 'input',
      value: 'cli-password',
      warn: '--password can be stored in shell history. Prefer --private or REPORT_PASSWORD.',
    },
  ])
})

test('adds REPORT_REALM as a secret action when configured', () => {
  const options = parseCloudflareArgs({
    argv: ['setup', '--project', 'client-report', '--realm=Client Portal'],
    env: {},
  })

  assert.deepEqual(getSecretActions(options), [
    {
      name: 'REPORT_REALM',
      mode: 'input',
      value: 'Client Portal',
      warn: '',
    },
  ])
})
