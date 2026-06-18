import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import path from 'path'
import { fileURLToPath } from 'url'

import { Countdowns } from './collections/Countdowns'
import { ExamResults } from './collections/ExamResults'
import { Media } from './collections/Media'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const normalizeURL = (url?: string) => {
  if (!url) {
    return undefined
  }

  const trimmedURL = url.trim()

  if (!trimmedURL) {
    return undefined
  }

  const urlWithProtocol = /^https?:\/\//.test(trimmedURL)
    ? trimmedURL
    : `https://${trimmedURL}`

  try {
    return new URL(urlWithProtocol).origin
  } catch {
    return undefined
  }
}

const serverURL =
  normalizeURL(process.env.NEXT_PUBLIC_SERVER_URL) ||
  normalizeURL(process.env.VERCEL_PROJECT_PRODUCTION_URL) ||
  normalizeURL(process.env.VERCEL_URL) ||
  'http://localhost:3000'

const configuredOrigins = (process.env.PAYLOAD_ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => normalizeURL(origin))
  .filter((origin): origin is string => Boolean(origin))

const allowedOrigins = Array.from(
  new Set(
    [
      serverURL,
      normalizeURL(process.env.VERCEL_PROJECT_PRODUCTION_URL),
      normalizeURL(process.env.VERCEL_URL),
      ...configuredOrigins,
    ].filter((origin): origin is string => Boolean(origin)),
  ),
)

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '— Yönetim Paneli',
      description: 'Site yönetim paneli',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Countdowns,
    ExamResults,
    Media,
    {
      slug: 'users',
      auth: true,
      admin: {
        useAsTitle: 'email',
        group: 'Sistem',
      },
      labels: {
        singular: 'Kullanıcı',
        plural: 'Kullanıcılar',
      },
      fields: [],
    },
  ],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'change-this-secret-min-32-chars!!',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  upload: {
    limits: {
      fileSize: 50 * 1024 * 1024,
    },
  },
  serverURL,
  cors: allowedOrigins,
  csrf: allowedOrigins,
})
