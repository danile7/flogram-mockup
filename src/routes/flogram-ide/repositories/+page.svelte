<script lang="ts">
	import Link from 'svelte-link';
	import { goto } from '$app/navigation';
	import IcBaselinePlus from '~icons/ic/baseline-plus';
	import BxArrowBack from '~icons/bx/arrow-back';
	import authStore from '$lib/store/auth';
	import RepositoryCard from '$lib/components/pages/flogram-new-ide/RepositoryCard.svelte';

	export let data;

	$:user = $authStore.user;
	$:repositories = data?.repositories ?? [];

</script>

<div
	class='flex flex-col p-16 dark:text-text-1-light text-text-1-dark dark:bg-back-1-dark bg-back-1-light min-h-screen overflow-y-auto'>
	<Link href = "/flogram-ide/code" class = "flex items-center gap-1 hover:underline py-2">
		<BxArrowBack/>
		<span>Back to IDE</span>
	</Link>
	<h1>Repositories</h1>
	<div class='pt-8 flex gap-2 flex-wrap'>
		{#if user}
			{#each repositories as name}
				<RepositoryCard name={name} link={`/flogram-ide/code/${name}`} />
			{/each}
		{/if}

		<button
			on:click={() => goto('/flogram-ide/create')}
			class='cursor-pointer  text-xl font-bold flex justify-center items-center bg-white bg-opacity-10 dark:bg-white dark:bg-opacity-10 flex flex-col min-w-[280px] p-4 rounded-md shadow-md  hover:text-primary  hover:border-primary dark:hover:border-primary dark:hover:border-opacity-100 border border-black border-opacity-20 dark:border-opacity-20 hover:border-opacity-100 dark:hover:border-opacity-100 dark:border-white transition-all duration-300'>
			<IcBaselinePlus/>
		</button>
	</div>
</div>