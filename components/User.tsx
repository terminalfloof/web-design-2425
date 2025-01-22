'use client';

import {
	ChevronsUpDown,
	LogOut,
	LogIn,
	SquarePen,
	FileBox,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
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
import { useEffect } from 'react';

export default function User() {
	const { isMobile, open } = useSidebar();
	const { user, logout } = useAuth();

	useEffect(() => console.log(user), [user]);

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
									{user.username
										.substring(0, 2)
										.toUpperCase()}
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
							<DropdownMenuItem className="font-bold">
								Roles
							</DropdownMenuItem>
							{user.roles.map((role) => (
								<DropdownMenuItem key={role}>
									{role}
								</DropdownMenuItem>
							))}
							<DropdownMenuSeparator />
							{user.roles.includes('admin') && (
								<DropdownMenuItem
									onClick={() => redirect('/admin')}
								>
									<FileBox />
									Admin Panel
								</DropdownMenuItem>
							)}
							<DropdownMenuItem onClick={logout}>
								<LogOut />
								Log out
							</DropdownMenuItem>
						</DropdownMenuContent>
					)}
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	) : open || isMobile ? (
		<>
			<Button onClick={() => redirect('/login')}>Log In</Button>
			<Button onClick={() => redirect('/register')}>Register</Button>
		</>
	) : (
		<>
			<Button onClick={() => redirect('/login')}>
				<LogIn />
			</Button>
			<Button onClick={() => redirect('/register')}>
				<SquarePen />
			</Button>
		</>
	);
}
