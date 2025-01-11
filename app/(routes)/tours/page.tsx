'use server';
import { getPayload } from 'payload';
import React from 'react';
import config from '@payload-config';
import { Media } from '@/payload-types';
import Image from 'next/image';

export default async function tours() {
	const payload = await getPayload({ config });
	const tourDates = await payload.find({
		collection: 'tourLocations',
	});
	return (
		<>
			<div className="p-8">
				{tourDates.docs.map((tourDate) => (
					<div key={tourDate.id} className="relative">
						<Image
							src={
								(tourDate.description.banner as Media)?.url ||
								''
							}
							alt={
								(tourDate.description.banner as Media)?.alt ||
								''
							}
							layout="fill"
							objectFit="cover"
							className="w-full h-full absolute top-0 left-0 -z-10 opacity-25"
						/>
						<h1>{tourDate.description.city}</h1>
						<p>
							{new Date(
								tourDate.locationTimes.startTime
							).toDateString()}
						</p>
						<p>
							{new Date(
								tourDate.locationTimes.endTime
							).toDateString()}
						</p>
					</div>
				))}
			</div>
		</>
	);
}
