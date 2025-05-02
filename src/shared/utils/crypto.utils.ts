import crypto from 'crypto';

export function generateCryptoToken(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}
