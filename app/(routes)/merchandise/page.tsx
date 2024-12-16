import { getPayload } from 'payload';
import config from '@payload-config';
import { Merchandise as Merch } from '@/payload-types';

const Merchandise = async () => {
	const payload = await getPayload({ config });

	const categories = await payload.find({
		collection: 'merchCategory',
		pagination: false,
	});

	return (
		<>
			{categories.docs.map((category) => (
				<div>
					<strong>{category.name}</strong>
					<ul>
						{category.merchEntries?.docs?.map((document) => {
							const doc = document as Merch;
							return (
								<li>
									<i>
										{doc.name} - ${doc.price}
									</i>
									<br />
									{doc.description}
								</li>
							);
						})}
					</ul>
				</div>
			))}
		</>
	);
};

export default Merchandise;
