import { getPayload } from 'payload';
import React from 'react';
import config from '@payload-config';
import { Media } from '@/payload-types';
import Image from 'next/image';
import moment from 'moment';
import Link from 'next/link';

export default async function tours() {
	const payload = await getPayload({ config });
	const tourDates = (
		await payload.find({
			collection: 'tourLocations',
		})
	).docs.sort(
		(a, b) =>
			new Date(a.locationTimes.startTime).getTime() -
			new Date(b.locationTimes.startTime).getTime()
	);
	return (
		<>
			{tourDates.map((tourDate) => (
				<Link
					href={`/tours/${tourDate.description.city.toLowerCase()}`}
					key={tourDate.id}
					className="relative h-48 p-4 flex justify-end flex-col group cursor-pointer overflow-hidden"
				>
					<Image
						src={(tourDate.description.banner as Media)?.url || ''}
						alt={(tourDate.description.banner as Media)?.alt || ''}
						fill
						className="grayscale to-transparent group-hover:grayscale-0 object-cover w-full h-full absolute top-0 left-0 -z-10 opacity-25 group-hover:opacity-80 duration-200 transition-opacity ease-in-out"
					/>
					<div className="group-hover:opacity-100 opacity-0 transition-opacity duration-100 bg-gradient-to-r absolute h-full w-1/2 top-0 left-0 from-black/75 to-transparent opacity"></div>
					<h1 className="text-2xl font-light mt-auto group-hover:scale-150 group-hover:tracking-wide group-hover:font-medium transform origin-bottom-left w-fit transition-transform ease-out">
						{tourDate.description.city},{' '}
						{tourDate.description.state}
					</h1>
					<p className="text-lg font-light tracking-wide z-10">
						{moment(tourDate.locationTimes.startTime).format(
							'MMM Do, YYYY h:mm A'
						)}{' '}
						-{' '}
						{moment(tourDate.locationTimes.endTime).format(
							'MMM Do, YYYY h:mm A'
						)}
					</p>
					{/* <p>{tourDate.locationTimes.venueName}</p> */}
				</Link>
			))}
		</>
	);
}

export const dynamic = 'force-dynamic';
