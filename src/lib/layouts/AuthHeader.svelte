<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Link from 'svelte-link';
	import { goto } from '$app/navigation';
	import Menu from '@smui/menu';
	import themeStore from '$lib/store/theme';
	import authStore from '$lib/store/auth';
	import AppButton from '$lib/components/core/AppButton.svelte';
	import ThemeToggleButton from '$lib/components/core/ThemeToggleButton.svelte';
	import { getCookie, isEmptyString } from '$lib/util';
	import { page } from '$app/stores';

	let menu: Menu;
	let anchor: HTMLDivElement;
	let anchorClasses: { [k: string]: boolean } = {};

	let isLabelMenuOpen = false;

	$: mode = $themeStore.mode;
	$: user = $authStore.user;
	$: isSignInPage = $page.url.pathname.startsWith('/auth/signin');

	let loading = true;

	$: {
		if (typeof window !== 'undefined') {
			const token = getCookie('access_token');

			if (isEmptyString(token)) {
				loading = false;
			} else {
				loading = user === null;
			}
		}
	}

	const toggle = async () => {
		themeStore.toggleMode();
	};

	const dispatch = createEventDispatcher();

	const gotoProfile = () => {
		goto(`/profile/${user?.username?.toLowerCase()}`);
	};
</script>

{#if !loading}
	<div
		class="dark:bg-charcoal sticky top-0 z-50 bg-white shadow-md dark:shadow-none left-0 right-0 w-full transition flex flex-col lg:flex-row justify-between items-center gap-4 px-8 py-6"
	>
		<div class="flex w-full justify-between items-center">
			<Link href="/" class="flex gap-2">
				<img width="0" height="0" class="w-10" src="/img/logo.png" alt="Flogram Logo" />
				<span class="text-charcoal dark:text-gray-100 font-bold text-2xl self-center">Flogram</span>
			</Link>

			<div class="gap-2 lg:gap-3 flex">
				<ThemeToggleButton handleClick={toggle} dark={mode === 'dark'} />

				<div class="flex gap-1">
					{#if isSignInPage}
						<Link href="/auth/signup">
							<AppButton>Sign Up</AppButton>
						</Link>
					{:else}
						<Link href="/auth/signin">
							<AppButton>Sign In</AppButton>
						</Link>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}
