'use client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useContext } from 'react';
import { CartContext, TicketGroup } from './CartContext';

export default function AddToCartTickets({
	item,
	children,
}: {
	item: TicketGroup;
	children?: React.ReactNode;
}) {
	const { addItem } = useContext(CartContext);
	return (
		<Button
			className="w-fit p-2 mt-4"
			onClick={() => {
				if (addItem(item)) toast.success(`Added ${item.name} to cart`);
				else toast.error(`Failed to remove ${item.name} from cart`);
			}}
		>
			{children}
		</Button>
	);
}
