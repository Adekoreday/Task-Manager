/* eslint-disable @typescript-eslint/ban-types */
import jwt from 'jsonwebtoken'
import { config } from 'dotenv'
config()

export interface DataStoredInToken {
  id: string
}

/**
 * @name generateToken
 * @param {object} payload
 * @param {String} expiresIn
 * @return {string} token
 */
export function generateToken(
  payload: DataStoredInToken,
  expiresIn: string
): string {
  if (!expiresIn) return jwt.sign(payload, process.env.JWT_KEY || '')
  return jwt.sign(payload, process.env.JWT_KEY || '', { expiresIn })
}
