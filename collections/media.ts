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
			{
				name: 'banner',
				width: 1600,
				height: 400,
			},
		],
	},
	access: {
		read: () => true,
	},
};
