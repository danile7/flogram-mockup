<script lang='ts'>
	import { createEventDispatcher } from 'svelte';
	import AppMenu from '../../../core/AppMenu.svelte';
	import MaterialSymbolsRoute from '~icons/material-symbols/route';

	const dispatch = createEventDispatcher();

	export let path;
	export let mule;

	let menuOpen = false;

	const navigate = (idx: number) => {

		menuOpen = false;

		dispatch('pathEvent', {
			path: path.slice(0, idx + 1)
		});
	};

</script>


<div class='hidden md:flex'>

	{#if path.length}
		<button on:click={() => navigate(-1)} class='cursor-pointer font-bold hover:underline'>root</button>
	{/if}


	{#each path as pItem, idx}

		{#if path.length > 0}/{/if}

		{#if idx < path.length - 1}
			<!-- svelte-ignore a11y-missing-attribute -->
			<button on:click={() => navigate(idx)}
							class='cursor-pointer hover:underline font-bold'> {pItem.replace('/', '')}</button>
		{:else}
			<span class=''>{pItem.replace('/', '')}</span>
		{/if}
	{/each}
</div>

<div class='flex md:hidden'>

	<AppMenu bind:open={menuOpen}>
		<button slot='button'>
			<MaterialSymbolsRoute class='text-xl' />
		</button>

		<div slot='menu'
				 class='flex flex-col rounded-md bg-white border dark:border-white dark:border-opacity-10 dark:bg-gray-800 shadow-md text-base'>
			<button
				class='p-2 border-b border-black border-opacity-10 bg-black bg-opacity-0 hover:bg-opacity-10 cursor-pointer transition-all duration-200 flex justify-center'
				on:click={ () => { if(path.length > 0){navigate(-1)} }}>
				root
			</button>

			{#each path as pItem, idx}
				{#if idx < path.length - 1}
					<button
						class='p-2 border-b border-black border-opacity-10 bg-black bg-opacity-0 hover:bg-opacity-10 cursor-pointer transition-all duration-200'
						on:click={() => navigate(idx)}
					>
						{pItem.replace("/", "")}
					</button>
				{/if}
			{/each}
		</div>
	</AppMenu>
</div>