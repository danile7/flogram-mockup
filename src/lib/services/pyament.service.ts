import fetchAPI from './fetchAPI';
import { env } from '$env/dynamic/public';

export const getClientSecret = async ({ amount }: { amount: number }) =>
	await fetchAPI.post('/api/payment', { amount });


// export const createSubscription = async ({duration, currency, amount, header = {}} : {duration : string, currency : string, amount : number, header : any }) =>
// 	await fetchAPI.post(`${env.PUBLIC_FLOGRAM_API_URL}/payment/create-subscription`, { duration, currency, amount}, header)


interface SUBSCRIPTION_PARAM {
	duration: string,
	currency: string,
	amount: number,
	header: any
}

export const createSubscription = async ({ duration, currency, amount, header = {} }: SUBSCRIPTION_PARAM) =>
	new Promise((resolve) => {
		console.log('Subscription : ', duration, currency, amount, header);
		setTimeout(() => {
			resolve(true)
		}, 2000);
	});
