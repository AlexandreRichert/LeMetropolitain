export const PASSWORD_MIN_LENGTH = 8
export const PASSWORD_MAX_LENGTH = 128

const COMMON_PASSWORDS = new Set([
  'password',
  'password1',
  '12345678',
  '123456789',
  '1234567890',
  'azerty123',
  'qwerty123',
  'motdepasse',
  'motdepasse1',
  '11111111',
  '00000000',
  'iloveyou',
  'admin123',
  'letmein1',
  'soleil123',
])

export const PASSWORD_REQUIREMENTS = [
  {
    id: 'length',
    label: `${PASSWORD_MIN_LENGTH} caractères minimum`,
    test: (password) => password.length >= PASSWORD_MIN_LENGTH,
  },
  {
    id: 'lowercase',
    label: 'Une minuscule',
    test: (password) => /[a-z]/.test(password),
  },
  {
    id: 'uppercase',
    label: 'Une majuscule',
    test: (password) => /[A-Z]/.test(password),
  },
  {
    id: 'digit',
    label: 'Un chiffre',
    test: (password) => /\d/.test(password),
  },
  {
    id: 'special',
    label: 'Un caractère spécial',
    test: (password) => /[^A-Za-z0-9]/.test(password),
  },
]

export function getFailedRequirements(password = '') {
  return PASSWORD_REQUIREMENTS.filter((rule) => !rule.test(password))
}

export function getPasswordScore(password = '') {
  if (!password) return 0
  return PASSWORD_REQUIREMENTS.filter((rule) => rule.test(password)).length
}

function containsPersonalInfo(password, { email, name } = {}) {
  const lower = password.toLowerCase()
  const fragments = []
  if (email) fragments.push(email.split('@')[0])
  if (name) fragments.push(...name.split(/\s+/))

  return fragments
    .map((fragment) => fragment.trim().toLowerCase())
    .filter((fragment) => fragment.length >= 3)
    .some((fragment) => lower.includes(fragment))
}

export function validatePassword(password = '', { email, name } = {}) {
  const errors = []

  if (!password) {
    return ['Le mot de passe est requis.']
  }

  const failed = getFailedRequirements(password)
  if (failed.length) {
    errors.push(`Il manque : ${failed.map((rule) => rule.label.toLowerCase()).join(', ')}.`)
  }

  if (password.length > PASSWORD_MAX_LENGTH) {
    errors.push(`Le mot de passe ne doit pas dépasser ${PASSWORD_MAX_LENGTH} caractères.`)
  }

  if (COMMON_PASSWORDS.has(password.toLowerCase())) {
    errors.push('Ce mot de passe est trop courant, choisissez-en un autre.')
  }

  if (containsPersonalInfo(password, { email, name })) {
    errors.push('Le mot de passe ne doit pas contenir votre nom ou votre email.')
  }

  return errors
}
