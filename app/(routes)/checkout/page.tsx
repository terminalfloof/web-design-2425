import { Check } from 'lucide-react';
import React from 'react';

export default function page() {
	return (
		<div className="flex items-center justify-center h-full gap-4">
			<Check className="stroke-green-400" />
			<h1 className="text-lg font-medium">
				Your order went through! We&apos;re processing your items,
				expect a knock on your door soon!
			</h1>
			<Check className="stroke-green-400" />
		</div>
	);
}
