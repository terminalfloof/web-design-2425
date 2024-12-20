'use client';
import React, {
	useState,
	createContext,
	useContext,
	useEffect,
	useCallback,
} from 'react';
import { User } from '@/payload-types';
import { z } from 'zod';
import { loginSchema } from '@/components/login-form';
import { useToast } from '@/hooks/use-toast';
import { redirect } from 'next/navigation';

type Login = (args: z.infer<typeof loginSchema>) => Promise<void>;

type Logout = () => Promise<void>;

type AuthContext = {
	user?: User | null;
	setUser: (user: User | null) => void;
	logout: Logout;
	login: Login;
	loaded: boolean;
};

const Context = createContext({} as AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = useState<User | null>();
	const [loaded, setLoaded] = useState(false);
	const { toast } = useToast();

	const login = useCallback<Login>(async (args) => {
		const res = await fetch(`/api/users/login`, {
			method: 'POST',
			body: JSON.stringify(args),
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (res.ok) {
			const json = await res.json();
			setUser(json.user);
			toast({
				title: 'Logged in successfully!',
				description: `Welcome back, ${json.user.username}.`,
			});
			redirect('/');
		} else {
			toast({
				title: "Couldn't log in!",
				description: 'Did you type in the right email or password?',
			});
			console.log(res);
		}
	}, []);

	const logout = useCallback<Logout>(async () => {
		const res = await fetch(`/api/users/logout`, {
			method: 'POST',
			credentials: 'include',
		});

		if (res.ok) {
			setUser(null);
		} else {
			throw new Error('There was a problem while logging out.');
		}
	}, []);

	useEffect(() => {
		const fetchMe = async () => {
			const result = await fetch(`/api/users/me`, {
				credentials: 'include',
			}).then((req) => req.json());
			setUser(result.user || null);
		};
		fetchMe().then(() => setLoaded(true));
	}, []);

	return (
		<Context.Provider
			value={{
				user,
				setUser,
				login,
				logout,
				loaded,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useAuth = () => useContext(Context);
