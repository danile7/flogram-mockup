<script>
	// import Nav from '../components/Nav.svelte';
	import { dev } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import AppButton from '$lib/components/core/AppButton.svelte';

	const offline = typeof navigator !== 'undefined' && navigator.onLine === false;

	let message = offline ? 'Find the internet and try again' : $page.error?.message;

	let title = offline ? 'Offline' : $page.status;
	if ($page.status === 404) {
		title = 'Page not found :(';
		message = 'Sorry! If you think this URL is broken, please let us know!';
	}
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class='h-screen flex flex-col items-center justify-center gap-4 bg-white dark:bg-charcoal'>
	<h1 class='text-[4em] font-bold dark:text-gray-100 font-gabarito'>{$page.status}: {title}</h1>
	<p class='dark:text-gray-300 text-2xl font-medium font-inter mb-4'>{message}</p>
	{#if dev && $page.error?.stack}
		<pre class='mono overflow-scroll bg-gray-800 p-8'>{$page.error?.stack}</pre>
	{/if}
	<AppButton size='lg' variant='primary-outlined' handleClick={() => goto('/')}>Go Home</AppButton>
</div>
