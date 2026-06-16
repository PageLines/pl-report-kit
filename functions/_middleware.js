// Cloudflare Pages Function: optional edge HTTP Basic Auth over the entire site.
//
// Public reports deploy without environment setup. Set REPORT_PASSWORD as a
// Cloudflare Pages secret to protect the whole site.

const DEFAULT_REALM = 'Private report'

export const formatRealm = (realm = DEFAULT_REALM) =>
  String(realm || DEFAULT_REALM)
    .replace(/["\\]/g, '')
    .replace(/[\r\n\t]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim() || DEFAULT_REALM

export const getBasicAuthPassword = (header) => {
  const [scheme, encoded] = (header || '').split(' ')

  if (scheme !== 'Basic' || !encoded) {
    return ''
  }

  let decoded = ''
  try {
    decoded = atob(encoded)
  } catch {
    return ''
  }

  const separator = decoded.indexOf(':')
  if (separator === -1) {
    return ''
  }

  return decoded.slice(separator + 1)
}

export const isAuthorized = (header, expectedPassword) => {
  if (!expectedPassword) {
    return false
  }

  return getBasicAuthPassword(header) === expectedPassword
}

export const shouldRequireAuth = (env = {}) => Boolean(env.REPORT_PASSWORD)

export const onRequest = async (context) => {
  const { env, request, next } = context
  const password = env?.REPORT_PASSWORD || ''
  const realm = env?.REPORT_REALM || DEFAULT_REALM

  if (!shouldRequireAuth(env)) {
    return next()
  }

  if (isAuthorized(request.headers.get('Authorization') || '', password)) {
    return next()
  }

  return new Response('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${formatRealm(realm)}", charset="UTF-8"`,
      'Cache-Control': 'no-store',
    },
  })
}
