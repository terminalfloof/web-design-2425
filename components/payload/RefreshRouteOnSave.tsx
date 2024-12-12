'use client';
import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react';
import { useRouter } from 'next/navigation';

export const RefreshRouteOnSave = () => {
	const router = useRouter();

	return (
		<PayloadLivePreview
			refresh={() => {
				console.log('refreshing...');
				router.refresh();
			}}
			serverURL={'http://localhost:3000'}
		/>
	);
};
