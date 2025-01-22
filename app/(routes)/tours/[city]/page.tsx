import { getPayload } from 'payload';
import config from '@payload-config';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Media } from '@/payload-types';
import { RichText } from '@payloadcms/richtext-lexical/react';
import moment from 'moment';
import AddToCartTickets from '@/components/addToCartTickets';
import { MapPin, Pause, Play } from 'lucide-react';

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
			<div className="grid grid-cols-5 h-full">
				{
					<div className="col-span-3 h-full w-full relative p-8 bg-gradient-to-tr from-black to-60%">
						<Image
							src={(city.description.banner as Media)?.url || ''}
							alt={(city.description.banner as Media)?.alt || ''}
							fill
							className="object-cover -z-10"
						/>
						<div className="absolute bottom-0 left-0 w-full p-6">
							<h2 className="text-2xl mt-2 font-medium flex gap-2 items-center">
								<Play />
								{moment(city.locationTimes.startTime).format(
									'MMM Do, YYYY h:mm A'
								)}
							</h2>
							<h2 className="text-2xl flex font-medium gap-2 items-center">
								<Pause />
								{moment(city.locationTimes.endTime).format(
									'MMM Do, YYYY h:mm A'
								)}
							</h2>
							<h2 className="text-2xl items-center font-medium flex gap-2">
								<MapPin />
								{city.locationTimes.venueName}
							</h2>
						</div>
					</div>
				}
				<div className="flex col-span-2 flex-col justify-center px-8">
					<h1 className="text-5xl font-bold mb-2">
						{city.description.city}, {city.description.state}
					</h1>
					{city.description.description && (
						<RichText
							className="[&>h1]:text-2xl [&>h1]:font-bold [&>h1]:tracking-tight lg:[&>h1]:text-3xl"
							data={city.description.description}
						/>
					)}
					<h2 className="mt-4 font-bold text-xl">
						Buy tickets here:
					</h2>
					<div className="flex-col gap-2">
						{city.information?.ticketGroups &&
							city.information.ticketGroups
								.sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
								.map((group) => (
									<AddToCartTickets
										item={group}
										key={group.id}
										city={city}
									>
										{group.name} - ${group.price}
									</AddToCartTickets>
								))}
					</div>
				</div>
			</div>
		</>
	);
}
