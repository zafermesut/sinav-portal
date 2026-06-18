import type { Payload } from 'payload'
import { getPayload as getPayloadBase } from 'payload'
import configPromise from '@payload-config'

// Singleton pattern for Next.js
const globalForPayload = globalThis as unknown as { payload?: Payload }

export const getPayload = async (): Promise<Payload> => {
  if (globalForPayload.payload) {
    return globalForPayload.payload
  }

  const payload = await getPayloadBase({ config: configPromise })
  globalForPayload.payload = payload
  return payload
}
