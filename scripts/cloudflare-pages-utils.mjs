const readArg = (args, names) => {
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i]
    const [key, value] = arg.split('=')
    if (names.includes(key)) {
      return value ?? args[i + 1] ?? ''
    }
  }
  return ''
}

const hasFlag = (args, name) => args.includes(name)

export const parseCloudflareArgs = ({ argv = [], env = {} } = {}) => {
  const [mode, ...args] = argv
  const cliPassword = readArg(args, ['--password'])
  const envPassword = env.REPORT_PASSWORD || ''
  const password = cliPassword || envPassword

  return {
    args,
    mode,
    projectName: readArg(args, ['--project', '--handle']) || env.CLOUDFLARE_PROJECT_NAME || '',
    privateReport: hasFlag(args, '--private') || Boolean(password),
    password,
    passwordSource: cliPassword ? 'cli' : envPassword ? 'env' : '',
    realm: readArg(args, ['--realm']) || env.REPORT_REALM || '',
    skipDeploy: hasFlag(args, '--skip-deploy'),
    helpRequested: !mode || hasFlag(args, '--help') || hasFlag(args, '-h'),
  }
}

export const getSecretActions = ({ privateReport, password, passwordSource, realm }) => {
  const actions = []

  if (password) {
    actions.push({
      name: 'REPORT_PASSWORD',
      mode: 'input',
      value: password,
      warn: passwordSource === 'cli' ? '--password can be stored in shell history. Prefer --private or REPORT_PASSWORD.' : '',
    })
  } else if (privateReport) {
    actions.push({
      name: 'REPORT_PASSWORD',
      mode: 'interactive',
      value: '',
      warn: '',
    })
  }

  if (realm) {
    actions.push({
      name: 'REPORT_REALM',
      mode: 'input',
      value: realm,
      warn: '',
    })
  }

  return actions
}
