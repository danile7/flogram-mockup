import { json } from '@sveltejs/kit';
import Stripe from 'stripe';
import { STRIPE_SECRET_KEY } from '$env/static/private';

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: '2024-04-10' }); // Specify API version for type safety

export async function POST({ request }): Promise<Response> {
	try {
		let { amount } = await request.json();

		amount = Math.round(parseFloat(amount) * 100);

		const paymentIntent = await stripe.paymentIntents.create({
			amount,
			currency: 'usd',
			payment_method_types: ['card']
		});

		return json({
			clientSecret: paymentIntent.client_secret
		});
	} catch (error: any) {
		return json({ error: error.message }, { status: 500 });
	}
}
