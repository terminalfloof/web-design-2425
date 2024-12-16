import type { CollectionConfig } from 'payload';

export const merchCategory: CollectionConfig = {
	slug: 'merchCategory',
	fields: [
		{
			name: 'name',
			type: 'text',
		},
		{
			name: 'description',
			type: 'textarea',
		},
		{
			name: 'merchEntries',
			type: 'join',
			collection: 'merchandise',
			on: 'category',
		},
	],
	admin: {
		useAsTitle: 'name',
	},
};
