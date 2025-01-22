import { getPayload } from 'payload';
import config from '@payload-config';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Media, MerchCategory } from '@/payload-types';
import AddToCart from '@/components/addToCart';
import {
	Breadcrumb,
	BreadcrumbList,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
	BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';

export default async function Page({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const payload = await getPayload({ config });
	const id = (await params).id;
	const item = await payload.findByID({
		collection: 'merchandise',
		id,
	});

	const category = item.category as MerchCategory;

	if (!item) return notFound();

	console.log(item);

	return (
		<div className="grid grid-cols-2 h-full">
			<div className="flex flex-col px-20 justify-center">
				<Breadcrumb className="mb-4">
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link href="/merchandise">Merchandise</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						{category.name && (
							<>
								<BreadcrumbSeparator />
								<BreadcrumbItem>
									<BreadcrumbLink asChild>
										<Link
											href={`/merchandise/${category.name.toLowerCase()}`}
										>
											{category.name}
										</Link>
									</BreadcrumbLink>
								</BreadcrumbItem>
							</>
						)}
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>{item.name}</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>

				<h1 className="text-4xl font-bold tracking-wider">
					{item.name}
				</h1>
				<h2 className="text-2xl mt-1 tracking-widest font-light">
					${parseInt(item.price + '').toFixed(2)} USD
				</h2>
				<p className="mt-2">{item.description}</p>
				<AddToCart {...item} />
			</div>
			{item.images && (
				<div className="h-full w-full relative p-8">
					<Image
						src={(item.images[0].image as Media).url || ''}
						alt={(item.images[0].image as Media).alt || ''}
						fill
						className="object-cover"
					/>
				</div>
			)}
		</div>
	);
}
