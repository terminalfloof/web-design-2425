import { CartItem } from '@/components/CartContext';
import { Merchandise } from '@/payload-types';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
	apiVersion: '2022-08-01',
});

export async function POST(req: NextRequest) {
	const data: CartItem[] = await req.json();
	try {
		const session = await stripe.checkout.sessions.create({
			line_items: data.map((item) => {
				return {
					price_data: {
						currency: 'usd',
						product_data: {
							name: item.item.name || 'missing name!!',
							// todo: fix this crappy patch
							description:
								(item.item as Merchandise).description || '',
						},
						unit_amount: Math.round((item.item.price || 0) * 100),
					},
					adjustable_quantity: {
						enabled: true,
						minimum: 1,
						maximum: 30,
					},
					quantity: item.quantity,
				};
			}),
			shipping_address_collection: {
				allowed_countries: ['US'],
			},
			// custom_fields: [
			// 	{
			// 		key: 'modifications',
			// 		label: {
			// 			type: 'custom',
			// 			custom: 'Order modifications',
			// 		},
			// 		type: 'text',
			// 		optional: true,
			// 	},
			// ],
			phone_number_collection: {
				enabled: true,
			},
			mode: 'payment',
			success_url: `http://${process.env.BASE_URL}/checkout?success=true`,
			cancel_url: `http://${process.env.BASE_URL}`,
		});

		if (session.url) {
			return NextResponse.json(
				{
					url: session.url,
				},
				{
					status: 200,
				}
			);
		}
	} catch (e) {
		console.log(e);
		return NextResponse.json(
			{
				error: e,
			},
			{
				status: 500,
			}
		);
	}
}
