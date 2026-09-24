import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH } from '@/lib/password'

const MESSAGES = {
  INVALID_EMAIL_OR_PASSWORD: 'Email ou mot de passe incorrect.',
  INVALID_EMAIL: "Cette adresse email n'est pas valide.",
  INVALID_PASSWORD: 'Mot de passe invalide.',
  PASSWORD_TOO_SHORT: `Le mot de passe doit contenir au moins ${PASSWORD_MIN_LENGTH} caractères.`,
  PASSWORD_TOO_LONG: `Le mot de passe ne doit pas dépasser ${PASSWORD_MAX_LENGTH} caractères.`,
  PASSWORD_TOO_WEAK: null,
  USER_ALREADY_EXISTS: 'Un compte existe déjà avec cette adresse email.',
  USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL: 'Un compte existe déjà avec cette adresse email.',
  USER_NOT_FOUND: 'Aucun compte ne correspond à cette adresse email.',
  CREDENTIAL_ACCOUNT_NOT_FOUND: 'Aucun compte ne correspond à ces identifiants.',
  EMAIL_NOT_VERIFIED: 'Merci de vérifier votre adresse email avant de continuer.',
  TOKEN_EXPIRED: "Ce lien a expiré, merci d'en redemander un.",
  INVALID_TOKEN: "Ce lien n'est plus valide.",
}

const EMAIL_ERROR_CODES = new Set([
  'INVALID_EMAIL',
  'USER_ALREADY_EXISTS',
  'USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL',
  'USER_NOT_FOUND',
  'CREDENTIAL_ACCOUNT_NOT_FOUND',
  'EMAIL_NOT_VERIFIED',
])

const PASSWORD_ERROR_CODES = new Set([
  'INVALID_PASSWORD',
  'PASSWORD_TOO_SHORT',
  'PASSWORD_TOO_LONG',
  'PASSWORD_TOO_WEAK',
])

/** Message affichable pour une erreur better-auth (ctx.error dans onError). */
export function getAuthErrorMessage(error) {
  if (!error) return 'Une erreur est survenue. Veuillez réessayer.'
  const mapped = error.code ? MESSAGES[error.code] : undefined
  return mapped || error.message || 'Une erreur est survenue. Veuillez réessayer.'
}

/**
 * Champ du formulaire concerné par l'erreur ("email" | "password" | null).
 */
export function getAuthErrorField(error) {
  const code = error?.code
  if (!code) return null
  if (EMAIL_ERROR_CODES.has(code)) return 'email'
  if (PASSWORD_ERROR_CODES.has(code)) return 'password'
  return null
}
