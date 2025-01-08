import {
	Calendar,
	Home,
	Inbox,
	MicVocal,
	Search,
	Send,
	Settings,
	Store,
} from 'lucide-react';

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';

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
	return (
		<Sidebar collapsible="icon">
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Stage Fright</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
