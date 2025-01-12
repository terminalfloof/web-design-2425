import { getPayload } from 'payload';
import config from '@payload-config';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Media } from '@/payload-types';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default async function Page({
	params,
}: {
	params: Promise<{ category: string }>;
}) {
	const payload = await getPayload({ config });
	const categoryName = (await params).category;
	const categories = await payload.find({
		collection: 'merchCategory',
		pagination: false,
	});

	const merchandise = await payload.find({
		collection: 'merchandise',
		pagination: false,
		depth: 2,
		where: {
			'category.name': {
				equals:
					categoryName.charAt(0).toUpperCase() +
					categoryName.slice(1),
			},
		},
	});

	const category = categories.docs.find(
		(category) => category.name?.toLowerCase() === categoryName
	);
	if (!category) {
		return notFound();
	}

	return (
		<>
			{categories.totalDocs > 0 && (
				<div
					className={
						'flex gap-6 underline-offset-2 underline justify-center w-full py-2'
					}
				>
					{categories.docs.map((category) => (
						<Link
							href={`/merchandise/${category.name?.toLowerCase()}`}
							key={category.id}
							className={cn(
								'flex flex-col gap-4',
								category.name?.toLowerCase() == categoryName
									? 'font-bold'
									: ''
							)}
						>
							{category.name}
						</Link>
					))}
				</div>
			)}
			{category.banner && (
				<div className="aspect-w-4 aspect-h-1 relative">
					<Image
						src={(category.banner as Media).url || ''}
						alt={(category.banner as Media).alt || ''}
						fill
						className="object-cover"
					/>
				</div>
			)}

			<div className="grid grid-cols-4 gap-6">
				{merchandise.totalDocs > 0 &&
					merchandise.docs.map((merch) => (
						<Link
							href={`/merchandise/item/${merch.id}`}
							key={merch.id}
						>
							<div className="w-full group h-full flex flex-col items-center justify-center py-8 px-4 cursor-pointer">
								{merch.images && (
									<div className="aspect-1 w-5/6 overflow-hidden bg-white relative">
										<Image
											src={
												(merch.images[0].image as Media)
													.url || ''
											}
											alt={merch.name}
											fill
											className="group-hover:scale-105 transform transition-transform duration-300 ease-in-out"
										/>
									</div>
								)}
								<h1 className="text-lg mt-2 font-bold tracking-wide group-hover:underline underline-offset-1">
									{merch.name}
								</h1>
								<h2>
									${parseInt(merch.price + '').toFixed(2)} USD
								</h2>
							</div>
						</Link>
					))}
			</div>
		</>
	);
}
