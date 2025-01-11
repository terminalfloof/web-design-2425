'use client';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from './AuthProvider';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from './ui/form';
import { useEffect, useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { redirect } from 'next/navigation';

export const loginSchema = z
	.object({
		email: z.string().email(),
		username: z.string().max(16),
		password: z.string(),
		confirmPassword: z.string(),
	})
	.refine((data) => data.confirmPassword === data.password, {
		message: 'Passwords do not match!',
		path: ['confirmPassword'],
	});

// TODO: stripe pushes registered users despite it being a field being invalid, pls fix soon

export function RegisterForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<'div'>) {
	const { toast } = useToast();
	const [loading, setLoading] = useState(false);
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			username: '',
			password: '',
			confirmPassword: '',
		},
	});

	const { login, user } = useAuth();

	useEffect(() => {
		if (user) {
			toast({ title: "You're already logged in!" });
			redirect('/');
		}
	}, [user, toast]);

	async function handleSubmit(data: z.infer<typeof loginSchema>) {
		if (loading) return;
		setLoading(true);
		console.log(data);
		// create a user
		const newData = {
			email: data.email,
			password: data.password,
			username: data.username,
			roles: ['user'],
		};
		const postData = await fetch('/api/users', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newData),
		});
		const responseData = await postData.json();
		console.log(responseData);
		if (!postData.ok) {
			toast({
				title: 'Failed to register!',
				description: responseData.errors[0].message,
			});
			setLoading(false);
		} else {
			toast({
				title: 'Regstration complete!',
				description:
					"Welcome aboard! We're logging you in right now...",
			});
			// login the user
			await login({ email: data.email, password: data.password });
			setLoading(false);
		}
	}

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Register</CardTitle>
					<CardDescription>
						We&apos;re glad you&apos;re here! Enter your email below
						to create an account.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(handleSubmit)}>
							<div className="flex flex-col gap-4">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input
													type="email"
													required
													placeholder="email@example.com"
													autoComplete="off"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="username"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Username</FormLabel>
											<FormControl>
												<Input
													type="text"
													required
													placeholder="username"
													autoComplete="off"
													maxLength={16}
													{...field}
												/>
											</FormControl>
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
													required
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="confirmPassword"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Confirm Password
											</FormLabel>
											<FormControl>
												<Input
													type="password"
													required
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<Button
									type="submit"
									disabled={loading}
									// asChild
								>
									<div
										className={cn(
											'flex items-center justify-center gap-1',
											loading ? 'opacity-50' : ''
										)}
									>
										<span>Register</span>
										{loading && (
											<LoaderCircle className="w-5 h-5 ml-2 animate-spin" />
										)}
									</div>
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
