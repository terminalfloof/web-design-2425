import type { CollectionConfig } from 'payload';

export const roles = ['user', 'admin'];

export const users: CollectionConfig = {
	slug: 'users',
	auth: true,
	fields: [
		{
			name: 'roles',
			type: 'select',
			options: roles,
			hasMany: true,
			required: true,
			defaultValue: 'user',
			hooks: {
				beforeChange: [
					({ data, req }) => {
						const isAdmin = req.user?.roles.includes('admin');

						if (!isAdmin) {
							return ['user'];
						}

						const userRoles = new Set(data?.roles || []);
						userRoles.add('user');
						return [...userRoles];
					},
				],
			},
		},
	],
	admin: {
		useAsTitle: 'email',
	},
};
