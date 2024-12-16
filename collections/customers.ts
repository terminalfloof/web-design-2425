import type { CollectionConfig } from 'payload';

export const customers: CollectionConfig = {
	slug: 'customers',
	auth: true,
	fields: [
		{
			name: 'name',
			type: 'text',
			required: true,
		},
	],
};
