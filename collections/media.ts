import { type CollectionConfig } from 'payload';

export const media: CollectionConfig = {
	slug: 'media',
	fields: [
		{
			name: 'alt',
			type: 'text',
			required: true,
		},
		{
			name: 'author',
			type: 'relationship',
			relationTo: 'users',
		},
	],
	upload: {
		imageSizes: [
			{
				name: 'avatar',
				width: 128,
				height: 128,
			},
		],
	},
	access: {
		read: () => true,
	},
};
