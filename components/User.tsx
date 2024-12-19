'use client';
import React from 'react';
import { DropdownMenu, DropdownMenuContent } from './ui/dropdown-menu';
import {
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import type { Media } from '@/payload-types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form';
import { useAuth } from '@/components/AuthProvider';

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export default function User() {
	const { login, logout, user, loaded } = useAuth();
	console.log(user);
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				{!loaded ? (
					<h1>loading...</h1>
				) : user ? (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<div className="flex items-center gap-2 w-fit">
								<Avatar>
									<AvatarImage
										src={(user?.avatar as Media)?.url || ''}
									/>
									<AvatarFallback>
										{user?.username.substring(0, 2)}
									</AvatarFallback>
								</Avatar>
								<h1>{user.username}</h1>
							</div>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem onClick={logout}>
								Log Out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				) : (
					<Dialog>
						<DialogTrigger>Log in</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Log in</DialogTitle>
							</DialogHeader>
							<Form {...form}>
								<form onSubmit={form.handleSubmit(login)}>
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Email</FormLabel>
												<FormControl>
													<Input
														placeholder="example@example.com"
														{...field}
													/>
												</FormControl>
												<FormDescription>
													This is your email address.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="password"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Password</FormLabel>
												<FormControl>
													<Input
														type="password"
														{...field}
													/>
												</FormControl>
												<FormDescription>
													This is your password.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>
									<Button>hi :3</Button>
								</form>
							</Form>
						</DialogContent>
					</Dialog>
				)}
			</DropdownMenuTrigger>
		</DropdownMenu>
	);
}
