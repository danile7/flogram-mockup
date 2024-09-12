<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { toast } from 'svelte-french-toast';
	import { loadStripe } from '@stripe/stripe-js';
	import { goto } from '$app/navigation';
	import { PUBLIC_STRIPE_KEY } from '$env/static/public';
	import { Address, Elements } from '$lib/components/pages/payment';
	import AppButton from '$lib/components/core/AppButton.svelte';
	import PaymentElement from '$lib/components/pages/payment/PaymentElement.svelte';
	import LinkAuthenticationElement from '$lib/components/pages/payment/LinkAuthenticationElement.svelte';
	import { getCookie } from '$lib/util';
	import data from '$lib/util/config';
	import { getClientSecret, createSubscription } from '$lib/services/pyament.service';
	import authStore from '$lib/store/auth';
	import Fireworks from '$lib/components/pages/payment/Fireworks.svelte';
	import GotoIDECard from '$lib/components/pages/payment/GotoIDECard.svelte';

	let stripe = null;
	let error = null;
	let cardElement;
	let name;
	let processing = false;
	let subscriptionOption;
	let clientSecret = null;
	let elements;
	let loading = false;
	let paySuccess = false;
	$: header = $authStore.authHeader;

	onMount(async () => {
		stripe = await loadStripe(PUBLIC_STRIPE_KEY);

		let choice = getCookie('payment-subscription-option');

		if (choice === 'month') {
			subscriptionOption = {
				duration: 'month',
				cost: data.payment.subscription.month
			};
		} else if (choice === 'year') {
			subscriptionOption = {
				duration: 'year',
				cost: data.payment.subscription.year
			};
		} else {
			await goto('/');
		}

		clientSecret = await createPaymentIntent();
	});

	async function createPaymentIntent() {
		try {
			let { clientSecret } = await getClientSecret({ amount: parseFloat(subscriptionOption.cost) });
			return clientSecret;
		} catch (err) {
			console.log(err);
			toast.error(err.message);
			return null;
		}
	}

	async function submit() {
		// avoid processing duplicates
		if (processing) return;

		processing = true;

		// create the payment intent server-side
		const clientSecret = await createPaymentIntent();

		// confirm payment with stripe
		if (clientSecret === null) return;

		const result = await stripe.confirmPayment({
			elements,
			redirect: 'if_required'
		});

		if (result.error) {
			error = result.error;
			processing = false;
		} else {
			// backend communication to store user payment information in the database

			const amount = result.paymentIntent.amount;
			const currency = result.paymentIntent.currency;
			const duration = subscriptionOption.duration;

			try {
				loading = true;
				let res = await createSubscription({ amount, currency, duration, header });
				paySuccess = true;
				toast.success('Success!');
			} catch (err) {
				console.log('Payment Subscription Error : ', err);
				if (err.message) {
					toast.error(err.message);
				}
			} finally {
				loading = false;
			}
		}
	}
</script>

{#if paySuccess}
	<div
		class="fixed w-screen h-screen flex justify-center items-center"
		transition:fade={{ duration: 200, easing: cubicOut }}
	>
		<Fireworks />
		<GotoIDECard />
	</div>
{:else}
	<div
		class="w-screen h-full bg-gray-100 dark:bg-transparent text-white flex justify-center items-center"
		transition:fade={{ duration: 200, easing: cubicOut }}
	>
		<div
			class="border border-black dark:border-white border-opacity-30 dark:border-opacity-30 p-4 rounded-md shadow-lg min-w-[280px] w-[420px] gradient"
			transition:fade={{ duration: 200 }}
		>
			<h1
				class="text-gray-800 dark:text-gray-100 text-center font-bold text-2xl [text-shadow:0px_2px_3px_rgba(0,0,0,0.4)] pb-2"
			>
				Upgrade Your Plan
			</h1>

			<div class="flex items-end pb-2">
				<h1 class="text-xl dark:text-white text-gray-900 font-bold mr-2">
					$ {subscriptionOption?.cost ? subscriptionOption.cost : ''}
				</h1>
				<span class="text-gray-500 text-sm"
					>/{subscriptionOption?.duration ? subscriptionOption.duration : ''}</span
				>
			</div>
			{#if error}
				<p class="text-[tomato] mt-8 mx-[0] mb-[0]">{error.message} Please try again.</p>
			{/if}

			{#if stripe !== null && clientSecret !== null}
				<div class="flex flex-col" transition:fade>
					<Elements
						{stripe}
						{clientSecret}
						theme="flat"
						labels="floating"
						variables={{ colorPrimary: '#7c4dff' }}
						rules={{ '.Input': { border: 'solid 1px #0002', padding: '5px 10px' } }}
						bind:elements
					>
						<form on:submit|preventDefault={submit} class="flex flex-col gap-2">
							<div class="flex flex-col gap-3">
								<LinkAuthenticationElement />
								<PaymentElement />
								<Address mode="billing" />
							</div>

							<div class="w-full pt-2 flex flex-col">
								<AppButton variant="primary" disabled={processing} isLoading={loading}>
									{#if processing}
										Processing...
									{:else}
										Pay
									{/if}
								</AppButton>
							</div>

							<!-- <div class="pt-3 flex justify-end">
							<Link
								href="/payment"
								class="text-[#13a6c7] transition-all duration-150 border-b border-transparent hover:border-[#13a6c7] font-bold "
								>Choose Other Options?</Link
							>
						</div> -->
						</form>
					</Elements>
				</div>
			{:else}
				<div class="flex flex-col gap-3">
					<div class="bg-white rounded-2xl w-full h-14 relative overflow-hidden bg-gray-300">
						<div class="absolute h-full w-16 to-red-50 spin" />
					</div>

					<div class="bg-white rounded-2xl w-full h-14 relative overflow-hidden bg-gray-300">
						<div class="absolute h-full w-16 to-red-50 spin" />
					</div>

					<div class="flex gap-3">
						<div class="bg-white rounded-2xl w-full h-14 relative overflow-hidden bg-gray-300">
							<div class="absolute h-full w-16 to-red-50 spin" />
						</div>
						<div class="bg-white rounded-2xl w-full h-14 relative overflow-hidden bg-gray-300">
							<div class="absolute h-full w-16 to-red-50 spin" />
						</div>
					</div>

					<div class="bg-white rounded-2xl w-full h-14 relative overflow-hidden bg-gray-300">
						<div class="absolute h-full w-16 to-red-50 spin" />
					</div>

					<div class="bg-white rounded-2xl w-full h-14 relative overflow-hidden bg-gray-300">
						<div class="absolute h-full w-16 to-red-50 spin" />
					</div>

					<div class="bg-white rounded-2xl w-full h-14 relative overflow-hidden bg-gray-300">
						<div class="absolute h-full w-16 to-red-50 spin" />
					</div>

					<div class="bg-white rounded-full w-full h-12 relative overflow-hidden bg-gray-300">
						<div class="absolute h-full w-16 to-red-50 spin" />
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.gradient {
		background: radial-gradient(
			circle at 58.04px 56.96px,
			rgba(52, 159, 192, 0.33) 0%,
			rgba(57, 107, 154, 0.05) 100%
		);
	}

	:global(.light .input) {
		border: 1px solid rgba(0, 0, 0, 0.3);
		padding: 0.85rem 1rem;
		border-radius: 5px;
		background: transparent;
	}

	:global(.dark .input) {
		border: 1px solid rgba(255, 255, 255, 0.3);
		padding: 0.85rem 1rem;
		border-radius: 5px;
		background: white;
	}

	.spin {
		background-image: linear-gradient(
			to right,
			rgba(0, 0, 0, 0),
			rgba(255, 255, 255, 0.5),
			rgba(0, 0, 0, 0)
		);

		transform: skew(-30deg);

		animation: toRight 2s ease-in-out infinite;
	}

	@keyframes toRight {
		from {
			left: -18%;
		}
		to {
			left: 120%;
		}
	}
</style>
