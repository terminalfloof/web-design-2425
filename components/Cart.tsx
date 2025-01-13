'use client';
import React, { useContext } from 'react';
import { Button } from './ui/button';
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogCancel,
	AlertDialogAction,
	AlertDialogHeader,
	AlertDialogFooter,
} from './ui/alert-dialog';
import { ScrollArea } from './ui/scroll-area';
import { RotateCw, ShoppingCart, X } from 'lucide-react';
import {
	Sheet,
	SheetTrigger,
	SheetContent,
	SheetHeader,
	SheetTitle,
} from './ui/sheet';
import { CartContext } from './CartContext';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Cart() {
	const [isLoading, setLoading] = React.useState(false);
	const router = useRouter();
	function checkout() {
		if (isLoading) return;
		setLoading(true);

		fetch('/create-checkout-session', {
			body: JSON.stringify(items),
			method: 'POST',
		}).then(async (res) => {
			if (res?.status == 200) {
				const body: {
					url: string;
				} = await res.json();
				// redirect to the url
				console.log(body.url);
				router.replace(body.url);
			}
		});
	}

	const { items, removeItem } = useContext(CartContext);

	return (
		<Sheet>
			<SheetTrigger asChild>
				<button
					aria-label="your cart"
					className="top-2 absolute right-4 grid size-8 cursor-pointer place-items-center rounded-md transition-all hover:black bg-background active:scale-95"
				>
					<ShoppingCart className="scale-90" />
					{items.length > 0 && (
						<div className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full bg-red-700 text-sm">
							<span>
								{items.reduce((a, b) => a + b.quantity, 0)}
							</span>
						</div>
					)}
				</button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>your cart</SheetTitle>
				</SheetHeader>
				{items.length > 0 ? (
					<div className="flex h-full flex-col gap-4 py-4">
						<ScrollArea className="flex-grow pr-4">
							{items.map((currentItem, index) => {
								return (
									<AlertDialog key={index}>
										<div
											key={index}
											className="z-10 group my-3 flex cursor-pointer select-none items-center justify-between"
										>
											<div>
												<div className="flex items-center gap-2">
													<h2 className="text-lg font-bold text-white">
														{currentItem.quantity >
														1
															? currentItem.quantity +
															  'x ' +
															  currentItem.item
																	.name
															: currentItem.item
																	.name}
													</h2>
													<AlertDialogTrigger asChild>
														<Button
															aria-label={`remove ${currentItem.item.name} from cart`}
															variant="ghost"
															className="opacity-25 p-1 size-4 bg-transparent transition-opacity duration-200 hover:opacity-100 focus:opacity-100 active:opacity-100"
														>
															<X
																strokeWidth={3}
																className="size-4 stroke-red-400"
															/>
														</Button>
													</AlertDialogTrigger>
												</div>

												<h2 className="mr-4 text-sm font-light">
													{
														// todo: fix this crappy patch
														(
															currentItem.item as any
														).description
													}
												</h2>
											</div>

											<h3 className="text-sm font-bold text-white">
												$
												{(
													(currentItem.item.price ||
														0) *
													currentItem.quantity
												).toFixed(2)}
											</h3>
										</div>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle>
													Are you sure?
												</AlertDialogTitle>
												<AlertDialogDescription>
													This will remove{' '}
													{currentItem.item.name} from
													your cart. This cannot be
													undone.
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>
													Cancel
												</AlertDialogCancel>
												<AlertDialogAction
													onClick={() => {
														if (
															removeItem(
																currentItem.item
																	.name || ''
															)
														) {
															toast.success(
																`Removed ${currentItem.item.name} from cart`
															);
														} else {
															toast.error(
																`Failed to remove ${currentItem.item.name} from cart`
															);
														}
													}}
												>
													Continue
												</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								);
							})}
						</ScrollArea>
						<h2>
							subtotal:{' '}
							<span className="font-bold">
								$
								{items
									.reduce(
										(a, b) =>
											a +
											(b.item.price || 0) * b.quantity,
										0
									)
									.toFixed(2)}
							</span>
						</h2>
						<Button
							className="w-full"
							disabled={isLoading}
							onClick={checkout}
						>
							{isLoading && (
								<RotateCw className="mr-2 size-4 animate-spin" />
							)}
							checkout
						</Button>
					</div>
				) : (
					<p>you don&apos;t have anything in your cart!</p>
				)}
			</SheetContent>
		</Sheet>
	);
}
