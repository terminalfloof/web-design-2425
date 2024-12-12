'use client';

import { useRowLabel } from '@payloadcms/ui';

export const TicketGroupLabel = () => {
	const { data, rowNumber } = useRowLabel<{ name?: string }>();
	return <div>{data.name || `Group ${(rowNumber || 0) + 1}`}</div>;
};

export const LocationDescription = () => {
	const { data } = useRowLabel<{
		locationTimes?: {
			venueName?: string;
			startTime?: Date;
			endTime?: Date;
		};
	}>();
	if (!data) return <div>no data found {':('}</div>;
	return <div>At {data.locationTimes?.venueName || 'Unknown Venue'}</div>;
};
