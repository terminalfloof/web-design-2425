'use client';
import { ReactNode, createContext, useState } from 'react';
import { toast } from 'sonner';

export type CartItem = {
	name: string;
	price: number;
	description?: string;
	stripeId?: string;
	quantity: number;
};

export const CartContext = createContext<{
	items: CartItem[];
	addItem: (item: CartItem) => boolean;
	removeItem: (name: string) => boolean;
}>({
	items: [],
	addItem: () => {
		return false;
	},
	removeItem: () => {
		return false;
	},
});

export default function CartContextComponent({
	children,
}: {
	children: ReactNode;
}) {
	const [items, setItems] = useState<CartItem[]>([]);

	function addItem(item: CartItem): boolean {
		const index = items.findIndex((i) => i.name === item.name);
		if (index === -1) {
			if (items.length < 100) {
				items.push(item);
				setItems([...items]);
				return true;
			}
			return false;
		} else {
			if (items[index].quantity >= 30) {
				toast.error('You cannot add more than 30 of the same item!');
				return false;
			}
			items[index].quantity++;
			setItems([...items]);
			return true;
		}
	}

	function removeItem(name: string): boolean {
		const index = items.findIndex((i) => i.name === name);
		if (index === -1) {
			return false;
		}
		if (items[index].quantity === 1) {
			setItems(items.filter((_, i) => i !== index));
			return true;
		} else {
			items[index].quantity--;
			setItems([...items]);
			return true;
		}
	}

	return (
		<CartContext.Provider value={{ items, addItem, removeItem }}>
			{children}
		</CartContext.Provider>
	);
}
