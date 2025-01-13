import { Mail } from 'lucide-react';
import React from 'react';

export default function ContactUs() {
	return (
		<div className="flex items-center justify-center h-full gap-4">
			<h1 className="flex gap-2">
				Find our email at{' '}
				<a
					href="mailto:inqueries@stagefright.live"
					className="text-blue-400 underline underline-offset-2"
				>
					inqueries@stagefright.live
				</a>
				<Mail />
			</h1>
		</div>
	);
}
