import { getPayload } from 'payload';
import config from '@payload-config';
import { Media, Merchandise as Merch } from '@/payload-types';
import Image from 'next/image';

const Merchandise = async () => {
	const payload = await getPayload({ config });

	const categories = await payload.find({
		collection: 'merchCategory',
		pagination: false,
	});

	const merchandise = await payload.find({
		collection: 'merchandise',
		pagination: false,
	});

	return (
		<>
			{categories.totalDocs > 0 && (
				<div className="flex gap-6 underline-offset-2 underline justify-center w-full py-2">
					{categories.docs.map((category) => (
						<a
							href={`/merchandise/${category.name?.toLowerCase()}`}
							key={category.id}
							className="flex flex-col gap-4"
						>
							{category.name}
						</a>
					))}
				</div>
			)}
			<div className="h-2/5 relative">
				<div className="w-1/2 h-full from-black opacity-90 from-20% to-transparent bg-gradient-to-r absolute left-0 top-0 -z-10"></div>
				<Image
					src="/api/media/file/Nashville.jpg"
					alt="nashville (temp image)"
					layout="fill"
					objectFit="cover"
					className=""
				/>
			</div>
			<div className="grid grid-cols-4 gap-6">
				{merchandise.totalDocs > 0 &&
					merchandise.docs.map((merch) => (
						<div className="w-full group h-full flex flex-col items-center justify-center py-8 px-4 cursor-pointer">
							{merch.images && (
								<div className="aspect-square w-5/6 bg-slate-500/20 relative">
									<Image
										src={
											(merch.images[0].image as Media)
												.url || ''
										}
										alt={merch.name}
										layout="fill"
										objectFit="contain"
										className="group-hover:scale-95 transform transition-transform duration-300 ease-in-out"
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
					))}
			</div>
		</>
	);
};

export default Merchandise;
