<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Toaster } from 'svelte-french-toast';
	import NProgress from 'nprogress';
	import 'nprogress/nprogress.css';
	import '../global.css';
	import { afterNavigate, goto } from '$app/navigation';
	import { navigating } from '$app/stores';
	import CookieBanner from '$lib/components/pages/components/CookieBanner.svelte';
	import themeStore from '$lib/store/theme';
	import authStore from '$lib/store/auth';
	import config from '$lib/util/config';

	export let data;

	let navbar: HTMLElement;
	let unsubscribeThemeStore;

	afterNavigate(() => {
		navbar?.scrollIntoView();
	});

	NProgress.configure(config.NProgressConfig);

	$: {
		$navigating ? NProgress.start() : NProgress.done();
	}

	async function handleSignOut(event) {
		const status = event.detail.signout;
		await goto(`/?signout=${status}`);
	}

	onMount(async () => {
		unsubscribeThemeStore = themeStore.subscribe(({ mode }) => {
			document.documentElement.classList.toggle('light', mode === 'light');
			document.documentElement.classList.toggle('dark', mode === 'dark');
		});

		if (data.user) {
			authStore.setUser(data.user);
		}
		if (data.authHeader) {
			authStore.setAuthHeader(data.authHeader);
		}
	});

	onDestroy(() => {
		if (unsubscribeThemeStore) unsubscribeThemeStore();
	});
</script>

<main class="font-oxygen">
	<nav bind:this={navbar} />
	<slot />
	<Toaster position={'top-center'} />
</main>

<CookieBanner />
