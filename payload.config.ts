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
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
})
