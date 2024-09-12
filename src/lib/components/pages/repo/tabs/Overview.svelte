<script lang='ts'>
	import { onDestroy, onMount } from 'svelte';
	import toast from 'svelte-french-toast';
	import { marked } from 'marked';
	import { updateProfileMD } from '$lib/services/repo.service.ts';
	import AppIconButton from '$lib/components/core/AppIconButton.svelte';
	import themeStore from '$lib/store/theme';
	import authStore from '$lib/store/auth';
	import config from '$lib/util/config';
	import MaterialSymbolsDone from '~icons/material-symbols/done';
	import MaterialSymbolsEdit from '~icons/material-symbols/edit';

	const overviewContent = config.repo.overview;
	let source: string = overviewContent?.source;

	$:{
		markdown = marked(source);
	}
	$: mode = $themeStore.mode;

	let markdown;

	let isEditable = false;

	$:user = $authStore.user;

	const handleEditable = () => {
		isEditable = !isEditable;
	};


	const updateProfileMDFromSource = () => async (data: string) => {
		try {
			await updateProfileMD({ profile: data });
		} catch (err: any) {
			console.log('err: ', err);
			if (err?.message) {
				toast.error(err.message);
				toast;
			}
		}
	};

	onMount(async () => {
		await updateProfileMDFromSource();
		markdown = marked(source);
	});

	onDestroy(() => {
		source = '';
		markdown = '';
	});

</script>

<main class='w-full h-full flex flex-col px-4 md:px-16 lg:px-32'>
	<div class='flex justify-between'>
		<span>{user?.username} / profile.md</span>
		<AppIconButton icon = { isEditable ?  MaterialSymbolsDone : MaterialSymbolsEdit } variant='outlined' handleClick={() => handleEditable()}/>
	</div>

	<div class='flex flex-col mt-3 flex-grow'>
		{#if isEditable}
			<textarea bind:value={source}
								class='bg-transparent w-full h-full text-[#83ba52] p-5 border border-black dark:border-white border-opacity-20 dark:border-opacity-10' />
		{:else}
			<div class='p-5'>{@html markdown}</div>
		{/if}
	</div>
</main>
