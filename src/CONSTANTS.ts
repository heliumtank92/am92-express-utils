import { ExpsConstants } from './TYPES'

/**
 * This module defines a set of constants used throughout the application.
 * These constants include header keys for request identification, session management,
 * client identification, and encryption key handling.
 *
 * @type {ExpsConstants}
 */
const CONSTANTS: ExpsConstants = {
  REQUEST_ID_HEADER_KEY: 'x-req-id',
  SESSION_ID_HEADER_KEY: 'x-session-id',
  CLIENT_ID_HEADER_KEY: 'x-api-client-id',
  ENCRYPTION_KEY_HEADER_KEY: 'x-api-encryption-key',
  PLAINTEXT_ENCRYPTION_KEY: 'plaintext-api-encryption-key'
}

export default CONSTANTS
