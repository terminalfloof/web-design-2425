'use client';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

export default function ContactUs() {
	return (
		<div className="flex items-center justify-center h-full gap-4">
			<Card className="p-2 w-2/5">
				<CardHeader className="text-2xl">
					<CardTitle>Contact Us</CardTitle>
					<CardDescription>
						Send us a message if you have any questions!
					</CardDescription>
				</CardHeader>

				<CardContent className="flex flex-col gap-2">
					<div>
						<Label htmlFor="name">Name:</Label>
						<Input id="name" />
					</div>

					<div>
						<Label htmlFor="email">Email:</Label>
						<Input id="email" type="email" />
					</div>

					<div>
						<Label htmlFor="phone">Phone:</Label>
						<Input id="phone" type="tel" />
					</div>

					<div>
						<Label htmlFor="message">Message:</Label>
						<Textarea id="message"></Textarea>
					</div>
				</CardContent>

				<CardFooter>
					<Button
						className="flex gap-2 items-center"
						onClick={() =>
							toast.success('Message sent!', {
								description:
									"We'll try to get back to you as soon as possible.",
							})
						}
					>
						<Mail />
						Send
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
