import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AuthProvider } from '@/components/AuthProvider';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import CartContext from '@/components/CartContext';
import Cart from '@/components/Cart';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Stage Fright',
	description: 'An unconventional rock band with a flair for the dramatic.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem
					// disableTransitionOnChange
				>
					<SidebarProvider defaultOpen={false}>
						<AuthProvider>
							<CartContext>
								<AppSidebar />
								<main className="flex-1">
									<SidebarTrigger className="absolute bg-background size-8 z-10 top-2" />
									{children}
									<Toaster />
								</main>
								<Cart />
							</CartContext>
						</AuthProvider>
					</SidebarProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
