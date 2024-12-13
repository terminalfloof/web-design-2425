import sharp from 'sharp';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { buildConfig } from 'payload';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import { tourLocations } from './collections/tourLocations';
import { media } from './collections/media';
import { stripePlugin } from '@payloadcms/plugin-stripe';
import { users } from './collections/user';

export default buildConfig({
	// If you'd like to use Rich Text, pass your editor here
	editor: lexicalEditor(),

	// Define and configure your collections in this array
	collections: [tourLocations, media, users],
	plugins: [
		vercelBlobStorage({
			collections: {
				media: true,
			},
			token: process.env.VERCEL_BLOB_TOKEN || '',
		}),
		stripePlugin({
			stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
			// stripe webhooks on event
			// webhooks: {}
			// todo: setup sync with related information
			// sync: []
		}),
	],
	secret: process.env.PAYLOAD_SECRET || '',
	db: mongooseAdapter({
		url: process.env.DATABASE_URI || '',
	}),
	admin: {
		user: 'users',
	},
	sharp,
});
