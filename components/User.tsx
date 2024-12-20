'use client';
import React from 'react';
import { DropdownMenu, DropdownMenuContent } from './ui/dropdown-menu';
import {
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import type { Media } from '@/payload-types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useAuth } from '@/components/AuthProvider';
import { Button } from './ui/button';

export default function User() {
	const { logout, user, loaded } = useAuth();
	console.log(user);

	return !loaded ? (
		<h1>loading...</h1>
	) : user ? (
		<div className="relative">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" className="w-fit py-2 h-12">
						<Avatar className="h-8 w-8 rounded-lg">
							<AvatarImage
								src={(user?.avatar as Media)?.url || ''}
								alt={user.username}
							/>
							<AvatarFallback className="rounded-lg">
								{user.username.substring(0, 2)}
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
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem onClick={logout}>
						Log Out
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	) : (
		<a href="/login">
			<Button>Log In</Button>
		</a>
	);
}
