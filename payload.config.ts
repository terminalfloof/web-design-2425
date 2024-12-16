import sharp from 'sharp';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { buildConfig } from 'payload';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import { tourLocations } from './collections/tourLocations';
import { media } from './collections/media';
import { stripePlugin } from '@payloadcms/plugin-stripe';
import { users } from './collections/user';
import { merchandise } from './collections/merchandise';
import { merchCategory } from './collections/merchCategory';

export default buildConfig({
	// If you'd like to use Rich Text, pass your editor here
	editor: lexicalEditor(),

	// Define and configure your collections in this array
	collections: [tourLocations, media, users, merchandise, merchCategory],
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
			stripeWebhooksEndpointSecret:
				process.env.STRIPE_WEBHOOKS_ENDPOINT_SECRET,
			// webhooks: {}
			sync: [
				{
					collection: 'merchandise',
					stripeResourceType: 'products',
					stripeResourceTypeSingular: 'product',
					fields: [
						{
							fieldPath: 'name',
							stripeProperty: 'name',
						},
						{
							fieldPath: 'description',
							stripeProperty: 'description',
						},
						{
							fieldPath: 'active',
							stripeProperty: 'active',
						},
					],
				},
				{
					collection: 'users',
					stripeResourceType: 'customers',
					stripeResourceTypeSingular: 'customer',
					fields: [
						{
							fieldPath: 'username',
							stripeProperty: 'name',
						},
						{
							fieldPath: 'email',
							stripeProperty: 'email',
						},
					],
				},
			],
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
