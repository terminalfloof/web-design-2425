import type { CollectionConfig, Tab } from 'payload';

export const states = [
	{ name: 'Alabama', abbreviation: 'AL' },
	{ name: 'Alaska', abbreviation: 'AK' },
	{ name: 'Arizona', abbreviation: 'AZ' },
	{ name: 'Arkansas', abbreviation: 'AR' },
	{ name: 'California', abbreviation: 'CA' },
	{ name: 'Colorado', abbreviation: 'CO' },
	{ name: 'Connecticut', abbreviation: 'CT' },
	{ name: 'Delaware', abbreviation: 'DE' },
	{ name: 'Florida', abbreviation: 'FL' },
	{ name: 'Georgia', abbreviation: 'GA' },
	{ name: 'Hawaii', abbreviation: 'HI' },
	{ name: 'Idaho', abbreviation: 'ID' },
	{ name: 'Illinois', abbreviation: 'IL' },
	{ name: 'Indiana', abbreviation: 'IN' },
	{ name: 'Iowa', abbreviation: 'IA' },
	{ name: 'Kansas', abbreviation: 'KS' },
	{ name: 'Kentucky', abbreviation: 'KY' },
	{ name: 'Louisiana', abbreviation: 'LA' },
	{ name: 'Maine', abbreviation: 'ME' },
	{ name: 'Maryland', abbreviation: 'MD' },
	{ name: 'Massachusetts', abbreviation: 'MA' },
	{ name: 'Michigan', abbreviation: 'MI' },
	{ name: 'Minnesota', abbreviation: 'MN' },
	{ name: 'Mississippi', abbreviation: 'MS' },
	{ name: 'Missouri', abbreviation: 'MO' },
	{ name: 'Montana', abbreviation: 'MT' },
	{ name: 'Nebraska', abbreviation: 'NE' },
	{ name: 'Nevada', abbreviation: 'NV' },
	{ name: 'New Hampshire', abbreviation: 'NH' },
	{ name: 'New Jersey', abbreviation: 'NJ' },
	{ name: 'New Mexico', abbreviation: 'NM' },
	{ name: 'New York', abbreviation: 'NY' },
	{ name: 'North Carolina', abbreviation: 'NC' },
	{ name: 'North Dakota', abbreviation: 'ND' },
	{ name: 'Ohio', abbreviation: 'OH' },
	{ name: 'Oklahoma', abbreviation: 'OK' },
	{ name: 'Oregon', abbreviation: 'OR' },
	{ name: 'Pennsylvania', abbreviation: 'PA' },
	{ name: 'Rhode Island', abbreviation: 'RI' },
	{ name: 'South Carolina', abbreviation: 'SC' },
	{ name: 'South Dakota', abbreviation: 'SD' },
	{ name: 'Tennessee', abbreviation: 'TN' },
	{ name: 'Texas', abbreviation: 'TX' },
	{ name: 'Utah', abbreviation: 'UT' },
	{ name: 'Vermont', abbreviation: 'VT' },
	{ name: 'Virginia', abbreviation: 'VA' },
	{ name: 'Washington', abbreviation: 'WA' },
	{ name: 'West Virginia', abbreviation: 'WV' },
	{ name: 'Wisconsin', abbreviation: 'WI' },
	{ name: 'Wyoming', abbreviation: 'WY' },
];

const description: Tab = {
	name: 'description',
	label: 'Description',
	fields: [
		{
			name: 'city',
			type: 'text',
			hooks: {
				beforeChange: [
					({ data, value }) => {
						console.log(value);
						console.log(data);
						if (data) {
							data.title = `${value}, ${data.description.state}`;
						}
					},
				],
			},
			required: true,
		},
		{
			name: 'state',
			type: 'select',
			options: states.map((state) => ({
				label: state.name,
				value: state.abbreviation,
			})),
			required: true,
		},
		{
			name: 'description',
			type: 'richText',
		},
		{
			name: 'banner',
			type: 'relationship',
			relationTo: 'media',
		},
	],
};

const location: Tab = {
	name: 'locationTimes',
	label: 'Location / Times',
	fields: [
		{
			name: 'venueName',
			type: 'text',
			required: true,
		},
		{
			name: 'address',
			type: 'text',
			required: true,
		},
		{
			name: 'startTime',
			type: 'date',
			admin: {
				date: {
					pickerAppearance: 'dayAndTime',
					timeIntervals: 15,
				},
			},
			required: true,
		},
		{
			name: 'endTime',
			type: 'date',
			admin: {
				date: {
					pickerAppearance: 'dayAndTime',
					timeIntervals: 15,
				},
			},
			required: true,
		},
	],
};

const tickets: Tab = {
	name: 'information',
	label: 'Ticket Information',
	fields: [
		{
			name: 'ticketGroups',
			type: 'array',
			minRows: 1,
			fields: [
				{
					unique: true,
					name: 'name',
					type: 'text',
					label: 'Ticket Group Name',
				},
				{
					name: 'price',
					type: 'number',
					label: 'Ticket Price (in $)',
				},
				{
					name: 'amount',
					type: 'number',
					label: 'Ticket Amount',
				},
			],
			admin: {
				components: {
					RowLabel:
						'@/components/payload/TourLocationComponents#TicketGroupLabel',
				},
			},
		},
	],
};

export const tourLocations: CollectionConfig = {
	slug: 'tourLocations',
	fields: [
		{
			type: 'tabs',
			tabs: [description, location, tickets],
		},
		{
			type: 'text',
			name: 'title',
			defaultValue: 'New Location',
			admin: {
				hidden: true,
			},
		},
	],
	labels: {
		singular: 'Tour Location',
		plural: 'Tour Locations',
	},
	admin: {
		livePreview: {
			url: 'http://localhost:3000/about',
		},
		useAsTitle: 'title',
	},
	versions: {
		drafts: {
			autosave: true,
		},
	},
};
