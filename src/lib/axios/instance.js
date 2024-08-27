import https from 'https'
import crypto from 'crypto'

export const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
  // allow legacy server
  secureOptions: crypto.constants.SSL_OP_LEGACY_SERVER_CONNECT
})
