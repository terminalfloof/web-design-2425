import { getPayload } from 'payload';
import config from '@payload-config';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { RefreshRouteOnSave } from '@/components/payload/RefreshRouteOnSave';

export default async function About() {
	const payload = await getPayload({ config });

	const tourLocations = await payload.find({
		collection: 'tourLocations',
		pagination: false,
		draft: true,
	});

	return (
		<div>
			<RefreshRouteOnSave />
			{tourLocations.docs.map((document) => (
				<div key={document.id}>
					<h1>{document.title}</h1>
					{document.description?.description && (
						<RichText
							data={document.description.description}
						></RichText>
					)}
				</div>
			))}
		</div>
	);
}
