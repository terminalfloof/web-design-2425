'use client';

import { Merchandise } from '@/payload-types';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useContext } from 'react';
import { CartContext } from './CartContext';

export default function AddToCart(item: Merchandise) {
	const { addItem } = useContext(CartContext);
	return (
		<Button
			className="w-fit p-2 mt-4"
			onClick={() => {
				if (addItem(item)) toast.success(`Added ${item.name} to cart`);
				else toast.error(`Failed to remove ${item.name} from cart`);
			}}
		>
			Add to cart
		</Button>
	);
}
