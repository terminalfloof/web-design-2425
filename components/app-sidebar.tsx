'use client';
import { Home, MicVocal, Send, Store } from 'lucide-react';
import Logo from '@/public/sf-light.svg';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar';
import User from './User';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// Menu items.
const items = [
	{
		title: 'About',
		url: '/',
		icon: Home,
	},
	{
		title: 'Tours',
		url: '/tours',
		icon: MicVocal,
	},
	{
		title: 'Merch',
		url: '/merchandise',
		icon: Store,
	},
	{
		title: 'Contact Us',
		url: '/contact-us',
		icon: Send,
	},
];

export function AppSidebar() {
	const { open } = useSidebar();
	return (
		<Sidebar collapsible="icon" variant="floating">
			<SidebarHeader className="flex items-center mt-2">
				<Image
					className={cn(
						'duration-300 ease-out transition-[width] size-6',
						open && 'size-16'
					)}
					src={Logo}
					alt="Stage Fright"
				/>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					{/* <SidebarGroupLabel>Stage Fright</SidebarGroupLabel> */}
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<User />
			</SidebarFooter>
		</Sidebar>
	);
}
