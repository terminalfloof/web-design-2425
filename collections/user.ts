import type { CollectionConfig } from 'payload';

export const users: CollectionConfig = {
	slug: 'users',
	auth: true,
	fields: [],
	admin: {
		useAsTitle: 'email',
	},
	labels: {
		singular: 'Admin User',
		plural: 'Admin Users',
	},
};
