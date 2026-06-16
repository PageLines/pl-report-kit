import assert from 'node:assert/strict'
import { test } from 'node:test'

import { isAuthorized, onRequest, shouldRequireAuth } from '../functions/_middleware.js'

const basic = (username, password) =>
  `Basic ${Buffer.from(`${username}:${password}`, 'utf8').toString('base64')}`

test('does not require auth when REPORT_PASSWORD is absent', () => {
  assert.equal(shouldRequireAuth({}), false)
  assert.equal(shouldRequireAuth({ REPORT_PASSWORD: '' }), false)
})

test('requires auth when REPORT_PASSWORD is configured', () => {
  assert.equal(shouldRequireAuth({ REPORT_PASSWORD: 'correct-password' }), true)
})

test('accepts any username when the password matches REPORT_PASSWORD', () => {
  assert.equal(isAuthorized(basic('reader', 'correct-password'), 'correct-password'), true)
})

test('rejects requests when the password does not match', () => {
  assert.equal(isAuthorized(basic('reader', 'wrong-password'), 'correct-password'), false)
})

test('rejects missing or malformed basic auth headers when auth is enabled', () => {
  assert.equal(isAuthorized('', 'correct-password'), false)
  assert.equal(isAuthorized('Bearer token', 'correct-password'), false)
  assert.equal(isAuthorized('Basic not-base64', 'correct-password'), false)
})

test('passes requests through when REPORT_PASSWORD is absent', async () => {
  let nextCalled = false
  const response = await onRequest({
    env: {},
    request: new Request('https://example.com/'),
    next: async () => {
      nextCalled = true
      return new Response('ok')
    },
  })

  assert.equal(nextCalled, true)
  assert.equal(await response.text(), 'ok')
})

test('challenges requests when REPORT_PASSWORD is configured and auth is missing', async () => {
  let nextCalled = false
  const response = await onRequest({
    env: { REPORT_PASSWORD: 'correct-password', REPORT_REALM: 'Client report' },
    request: new Request('https://example.com/'),
    next: async () => {
      nextCalled = true
      return new Response('ok')
    },
  })

  assert.equal(nextCalled, false)
  assert.equal(response.status, 401)
  assert.equal(response.headers.get('WWW-Authenticate'), 'Basic realm="Client report", charset="UTF-8"')
  assert.equal(response.headers.get('Cache-Control'), 'no-store')
})

test('uses the default realm when REPORT_REALM is absent', async () => {
  const response = await onRequest({
    env: { REPORT_PASSWORD: 'correct-password' },
    request: new Request('https://example.com/'),
    next: async () => new Response('ok'),
  })

  assert.equal(response.status, 401)
  assert.equal(response.headers.get('WWW-Authenticate'), 'Basic realm="Private report", charset="UTF-8"')
})

test('sanitizes the configured realm before writing the auth header', async () => {
  const response = await onRequest({
    env: {
      REPORT_PASSWORD: 'correct-password',
      REPORT_REALM: 'Client "Alpha"\nReport',
    },
    request: new Request('https://example.com/'),
    next: async () => new Response('ok'),
  })

  assert.equal(response.status, 401)
  assert.equal(response.headers.get('WWW-Authenticate'), 'Basic realm="Client Alpha Report", charset="UTF-8"')
})

test('passes requests through when the Basic Auth password matches', async () => {
  let nextCalled = false
  const response = await onRequest({
    env: { REPORT_PASSWORD: 'correct-password' },
    request: new Request('https://example.com/', {
      headers: { Authorization: basic('reader', 'correct-password') },
    }),
    next: async () => {
      nextCalled = true
      return new Response('ok')
    },
  })

  assert.equal(nextCalled, true)
  assert.equal(response.status, 200)
  assert.equal(await response.text(), 'ok')
})
