<script lang='ts'>
	import { onMount } from 'svelte';
	import LibraryCard from '$lib/components/pages/repo/LibraryCard.svelte';
	import { libraries } from '$lib/store/libraries';
	import toast from 'svelte-french-toast';
	import themeStore from '$lib/store/theme';
	import AppButton from '$lib/components/core/AppButton.svelte';
	import { goto } from '$app/navigation';
	import { Icon } from '@smui/button';
	import AppInput from '$lib/components/core/AppInput.svelte';
	import { getLibraries, searchLibraries } from '$lib/services/repo.service';

	$:mode = $themeStore.mode;
	let searchValue = '';
	let loading = false;


	const fetchLibrary = async () => {
		try {
			loading = true;
			libraries.set([]);

			const newLibraries = await getLibraries();

			libraries.set(newLibraries);
		} catch (error: any) {
			libraries.set([]);
			if (error.message) {
				toast.error(error.message);
			}
		} finally {
			loading = false;
		}
	};

	const searchLibrary = async (searchValue: string | undefined) => {

		if (searchValue) {
			try {
				const newLibraries = await searchLibraries({ libraryName: searchValue });
				libraries.set(newLibraries);
			} catch (err: any) {
				if (err?.message) {
					toast.error(err.message);
				}
			}
		} else {
			await fetchLibrary();
		}
	};

	onMount(async () => {
		await fetchLibrary();
	});

	$:{
		// console.log('Library : ', $libraries);
	}

</script>


<div class='w-full flex flex-col gap-5'>
	<!-- top side -->
	<div class='w-full flex justify-between flex-col md:flex-row md:items-center gap-4'>
		<div class='flex-grow flex flex-col text-red-500 md:pr-10'>

			<AppInput bind:value={searchValue}
								type='text'
								class='shaped-outlined'
								variant='outlined'
								label='Library Name'
								name='library'
								disabled={loading}
								icon='source'
			/>

		</div>

		<AppButton handleClick={() => goto('/app/repo/create')} variant='primary'>
			New Library
			<Icon class='material-icons ml-2'>add</Icon>
		</AppButton>

	</div>

	<div class='w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8'>
		{#if !loading}
			{#if $libraries.length}
				{#each $libraries as library}
					<LibraryCard {library} />
				{/each}
			{:else}
				<div>There is no library data.</div>
			{/if}
		{:else}
			<div>Loading...</div>
		{/if}
	</div>
</div>

