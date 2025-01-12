import type { CollectionConfig } from 'payload';
import { stripeProxy } from '@payloadcms/plugin-stripe';

// note: this is a hacky workaround
// assume that our cms is the single source of truth for products

export const merchandise: CollectionConfig = {
	slug: 'merchandise',
	hooks: {
		afterChange: [
			async ({ doc, previousDoc }) => {
				// check if price changed.
				if (doc.price == previousDoc.price) return;
				// it changed! update our price entry
				const product = await stripeProxy({
					stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
					stripeMethod: 'products.retrieve',
					stripeArgs: [doc.stripeID],
				});
				console.log(product);
				// make a new Price object
				const newPrice = await stripeProxy({
					stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
					stripeMethod: 'prices.create',
					stripeArgs: [
						{
							currency: 'usd',
							product: product.data.id,
							unit_amount: Math.round(doc.price * 100),
						},
					],
				});
				// set the new default price
				await stripeProxy({
					stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
					stripeMethod: 'products.update',
					stripeArgs: [
						doc.stripeID,
						{
							default_price: newPrice.data.id,
						},
					],
				});
				// and be sure to archive the previous price if it exists
				if (product.data.default_price === null) return;
				const archivedPrice = await stripeProxy({
					stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
					stripeMethod: 'prices.update',
					stripeArgs: [
						product.data.default_price,
						{
							active: false,
						},
					],
				});
				return;
				// console.log(result);
			},
		],
	},
	fields: [
		{
			name: 'name',
			type: 'text',
			required: true,
			unique: true,
		},
		{
			name: 'description',
			type: 'textarea',
		},
		{
			name: 'active',
			type: 'checkbox',
			label: 'Product Active?',
			defaultValue: true,
		},
		{
			name: 'price',
			type: 'number',
		},
		{
			name: 'images',
			type: 'array',
			fields: [
				{
					name: 'image',
					type: 'upload',
					relationTo: 'media',
					required: true,
				},
				{
					name: 'caption',
					type: 'text',
				},
			],
		},
		{
			name: 'stock',
			type: 'number',
		},
		{
			name: 'category',
			type: 'relationship',
			relationTo: 'merchCategory',
			required: true,
		},
	],
	labels: {
		singular: 'Merchandise',
		plural: 'Merchandise',
	},
	admin: {
		useAsTitle: 'name',
	},
};
