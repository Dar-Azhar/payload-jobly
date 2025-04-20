// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Media } from './collections/Media'
import { JobApplications } from './collections/JobApplications'
import { Assesments } from './collections/Assesments'
import { Questions } from './collections/Questions'
import { Settings } from './globals/Settings'
import { rootAfterErrorHook } from './hooks/root/rootAfterErrorHook'
import { Jobs } from './collections/Jobs/Jobs'
import { Users } from './collections/Users/Users'
import { jobsEndpoint } from './collections/Jobs/endpoints/Jobs.endpoints'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    // avatar: 'gravatar',
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      actions: ['/collections/Users/ui/ButtonComponent'],
      beforeDashboard: ['/collections/Users/ui/BeforeDashbaordComponent'],
    },

  },
  // Root level Hooks
  hooks: {
    afterError: [rootAfterErrorHook],
  },
  endpoints: [jobsEndpoint],
  collections: [Users, Media, Jobs, JobApplications, Assesments, Questions],
  globals: [Settings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',

  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
