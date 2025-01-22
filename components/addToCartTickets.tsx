'use client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useContext } from 'react';
import { CartContext } from './CartContext';
import { TourLocation } from '@/payload-types';

type TicketGroup = {
	name?: string | null;
	price?: number | null;
	amount?: number | null;
	id?: string | null;
	description?: string | null;
};

export default function AddToCartTickets({
	item,
	children,
	city,
}: {
	item: TicketGroup;
	children?: React.ReactNode;
	city: TourLocation;
}) {
	const { addItem } = useContext(CartContext);
	return (
		<Button
			className="w-fit p-2 my-3 block"
			onClick={() => {
				const newItem = {
					name:
						`${item.name} - ${city.description.city}, ${city.description.state}` ||
						'A generic ticket',
					price: item.price || 0,
					description:
						item.description ||
						`A ${item.name} ticket for ${city.description.city}, ${city.description.state}.`,
					quantity: 1,
				};
				if (addItem(newItem))
					toast.success(`Added ${item.name} to cart`);
				else toast.error(`Failed to remove ${item.name} from cart`);
			}}
		>
			{children}
		</Button>
	);
}
