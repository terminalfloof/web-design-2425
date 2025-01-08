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
import { redirect } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export function LoginForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<'div'>) {
	const { toast } = useToast();
	const [loading, setLoading] = useState(false);
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const { login, user } = useAuth();

	useEffect(() => {
		console.log(user);
		if (user) {
			toast({ title: "You're already logged in!" });
			redirect('/');
		}
	}, [user]);

	async function handleSubmit(data: z.infer<typeof loginSchema>) {
		setLoading(true);
		await login(data);
		setLoading(false);
	}

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Enter your email below to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(handleSubmit)}>
							<div className="flex flex-col gap-6">
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
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											{/* <a
												href="#"
												className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
											>
												Forgot your password?
											</a> */}
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
										<span>Login</span>
										{loading && (
											<LoaderCircle className="w-5 h-5 ml-2 animate-spin" />
										)}
									</div>
								</Button>
								{/* <Button variant="outline" className="w-full">
									Login with Google
								</Button> */}
							</div>
							{/* <div className="mt-4 text-center text-sm">
								Don&apos;t have an account?{' '}
								<a
									href="#"
									className="underline underline-offset-4"
								>
									Sign up
								</a>
							</div> */}
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
