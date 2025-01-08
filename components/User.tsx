'use client';

import {
	BadgeCheck,
	Bell,
	ChevronsUpDown,
	CreditCard,
	LogOut,
	LogIn,
	Sparkles,
	User as UserIcon,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar';
import { useAuth } from './AuthProvider';
import { Media } from '@/payload-types';
import { Button } from './ui/button';
import { redirect } from 'next/navigation';

export default function User() {
	const { isMobile } = useSidebar();

	const { open } = useSidebar();
	const { user, loaded, login, logout } = useAuth();

	return user ? (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className={
								'data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
							}
							asChild={!user}
						>
							<Avatar className="h-8 w-8 rounded-lg">
								<AvatarImage
									src={(user?.avatar as Media)?.url || ''}
									alt={user.username}
								/>
								<AvatarFallback className="rounded-lg">
									CN
								</AvatarFallback>
							</Avatar>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-semibold">
									{user.username}
								</span>
								<span className="truncate text-xs">
									{user.email}
								</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					{user && (
						<DropdownMenuContent
							className="w-[--radix-dropdown-menu-trigger-width] min-w-40 rounded-lg"
							side={isMobile ? 'bottom' : 'right'}
							align="end"
							sideOffset={4}
						>
							<DropdownMenuItem onClick={logout}>
								<LogOut />
								Log out
							</DropdownMenuItem>
						</DropdownMenuContent>
					)}
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	) : open ? (
		<Button onClick={() => redirect('/login')}>Log In</Button>
	) : (
		<Button onClick={() => redirect('/login')}>
			<LogIn />
		</Button>
	);
}
