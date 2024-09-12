<script lang="ts">
	import { onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import LibraryCard from '$lib/components/pages/repo/LibraryCard.svelte';
	import type { LibraryType } from '$lib/types/Library';
	import { env } from '$env/dynamic/public';
	import { libraries } from '$lib/store/libraries';
	import themeStore from '$lib/store/theme';
	import fetchAPI from '$lib/services/fetchAPI';

	$: mode = $themeStore.mode;

	onMount(async () => {
		try {
			libraries.set([]);

			const response = await fetchAPI.get(`${env.PUBLIC_FLOGRAM_API_URL}/libraries/`);

			libraries.set(response);
		} catch (error) {
			libraries.set([]);
		}
	});

	const searchLibrary = async (e: any) => {
		try {
			if (e.target.value) {
				const response = fetchAPI.get(
					`${env.PUBLIC_FLOGRAM_API_URL}/libraries/search/${e.target.value}`
				);

				libraries.set(response);
			} else {
				const response = await fetchAPI.get(`${env.PUBLIC_FLOGRAM_API_URL}/libraries/`);

				libraries.set(response);
			}
		} catch (e) {
			toast.error('Error occurred!');
		}
	};
</script>

<div class="w-screen flex flex-col gap-5 px-6 relative">
	<!-- top side -->
	<div class="w-full flex items-center justify-center py-6">
		<div class="flex gap-5">
			<input
				class="dark:bg-slate-700 dark:text-gray-100 h-12 text-lg px-4 w-[40rem] outline outline-transparent outline-2 outline-offset-2 appearance-none relative transition py-0 border border-inherit focus-visible:z-1"
				placeholder="Find a library..."
				on:input={(e) => searchLibrary(e)}
				type="text"
			/>
		</div>
	</div>
	<!-- library list -->
	<div class="grid lg:grid-cols-2 gap-5">
		{#each $libraries as library}
			<div class="dark:bg-slate-700 bg-gray-200">
				<LibraryCard {library} />
			</div>
		{/each}
	</div>
</div>
