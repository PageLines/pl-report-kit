import assert from 'node:assert/strict'
import { test } from 'node:test'

import { isAuthorized, shouldRequireAuth } from '../functions/_middleware.js'

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
