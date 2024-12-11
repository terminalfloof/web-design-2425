import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { buildConfig } from 'payload'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Define and configure your collections in this array
  collections: [
    {
      slug: "tourLocations",
      fields: [
        {
          name: 'start',
          type: 'date'
        },
        {
          name: 'end',
          type: 'date',
        },
        {
          name: 'city',
          type: 'text'
        },
        {
          name: 'address',
          type: 'text'
        },
        {
          name: 'venue',
          type: 'point'
        },
        {
          name: 'description',
          type: 'richText'
        },
        {
          name: 'banner',
          type: 'upload',
          relationTo: 'media'
        }
      ]
    },
    {
      slug: 'media',
      fields: [
        {
          name: 'alt',
          type: 'text'
        }
      ]
    }
  ],
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true
      },
      token: process.env.VERCEL_BLOB_TOKEN || ''
    })
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
})
