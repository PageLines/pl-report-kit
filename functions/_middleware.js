// Cloudflare Pages Function: optional edge HTTP Basic Auth over the entire site.
//
// Public reports deploy without environment setup. Set REPORT_PASSWORD in
// Cloudflare Pages environment variables to protect the whole site.

const DEFAULT_REALM = 'Private report'

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
      'WWW-Authenticate': `Basic realm="${REALM}", charset="UTF-8"`,
      'Cache-Control': 'no-store',
    },
  })
}
