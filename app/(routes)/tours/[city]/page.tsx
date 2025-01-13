import { getPayload } from 'payload';
import config from '@payload-config';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Media } from '@/payload-types';
import { RichText } from '@payloadcms/richtext-lexical/react';
import moment from 'moment';
import AddToCartTickets from '@/components/addToCartTickets';

export default async function Page({
	params,
}: {
	params: Promise<{ city: string }>;
}) {
	const payload = await getPayload({ config });
	const cityName = (await params).city;
	const cities = await payload.find({
		collection: 'tourLocations',
		where: {
			'description.city': {
				equals: cityName.charAt(0).toUpperCase() + cityName.slice(1),
			},
		},
	});
	if (cities.totalDocs == 0) return notFound();
	const city = cities.docs[0];

	return (
		<>
			<div className="grid grid-cols-2 h-full">
				{
					<div className="h-full w-full relative p-8">
						<Image
							src={(city.description.banner as Media)?.url || ''}
							alt={(city.description.banner as Media)?.alt || ''}
							fill
							className="object-cover"
						/>
					</div>
				}
				<div className="flex flex-col justify-center px-4">
					<h1 className="text-4xl font-medium">
						{city.description.city}, {city.description.state}
					</h1>
					<h2 className="text-lg font-light tracking-wide mt-1">
						{moment(city.locationTimes.startTime).format(
							'MMM Do, YYYY h:mm A'
						)}{' '}
						-{' '}
						{moment(city.locationTimes.endTime).format(
							'MMM Do, YYYY h:mm A'
						)}
					</h2>
					<h2 className="mb-4 text-lg font-light tracking-wide">
						{city.locationTimes.venueName}
					</h2>
					{city.description.description && (
						<RichText
							className="[&>h1]:text-2xl [&>h1]:font-bold [&>h1]:tracking-tight lg:[&>h1]:text-3xl"
							data={city.description.description}
						/>
					)}
					<div className="flex gap-4 mt-4">
						{city.information?.ticketGroups &&
							city.information.ticketGroups.map((group) => (
								<AddToCartTickets item={group} key={group.id}>
									{group.name} - ${group.price}
								</AddToCartTickets>
							))}
					</div>
				</div>
			</div>
		</>
	);
}
