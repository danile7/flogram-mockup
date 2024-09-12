<script lang="ts">
	import Button from '$lib/components/core/Button.svelte';
	import { onMount } from 'svelte';
	import { getCookie, setCookie } from '$lib/util';

	let showBanner = false; // Flag to control the visibility of the consent banner
	let consent; // Variable to control reminder banner

	onMount(() => {
		// Retrieve user's previous consent status from local storage
		const cookiesSubscribed = getCookie('COOKIE_SUBSCRIBED') || '';
		// Set the consent status in the store
		consent = cookiesSubscribed;
		// Determine whether to show the consent banner based on the user's previous decision
		if (cookiesSubscribed === 'true') {
			showBanner = false; // Hide banner if user previously accepted cookies
		} else {
			if (cookiesSubscribed === '') {
				showBanner = true; // Show banner if user's previous decision is unknown
			}
		}
	});

	// Function to handle user's consent decision
	async function handleConsent(decision) {
		// Save user's decision in local storage and update consent status
		setCookie('COOKIE_SUBSCRIBED', decision, 365);
		consent = decision;
		showBanner = false; // Hide consent banner after user's decision
	}

	// Function to handle user opting out of cookies
	function handleOptOut() {
		showBanner = true; // Show consent banner to allow changing settings
	}
</script>

{#if showBanner}
	<div class="fixed bottom-0 z-50 w-screen">
		<div
			class="w-full border-t-2 border-black dark:border-white bg-white dark:bg-charcoal py-4 px-2 flex flex-col md:flex-row items-center justify-center gap-6 lg:gap-10"
		>
			<div class="dark:text-white font-inter">
				<p>This website uses cookies to ensure you get the best experience on our website.</p>
				<p>
					To find out more about how these cookies function, see our <a
						href="/"
						class=" text-blue-600">Privacy Policy</a
					>
				</p>
			</div>
			<div class="flex gap-2">
				<Button handleClick={() => handleConsent(true)} colorScheme={'black-ghost'} variant="ghost"
					>Allow</Button
				>
				<Button handleClick={() => handleConsent(false)} colorScheme={'black'}>Decline</Button>
			</div>
		</div>
	</div>
{:else if consent === 'false'}
	<div class="fixed bottom-0 z-50 w-screen">
		<div
			class="w-full border-t-2 border-black dark:border-white bg-white dark:bg-charcoal py-4 px-2 flex flex-col md:flex-row items-center justify-center gap-6 lg:gap-10"
		>
			<div class="dark:text-white font-inter">You have opted out of cookies. Change settings?</div>

			<Button handleClick={() => handleOptOut()} colorScheme={'black-ghost'} variant="ghost"
				>Change</Button
			>
		</div>
	</div>
{/if}
