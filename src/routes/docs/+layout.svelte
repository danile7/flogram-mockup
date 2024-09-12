<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/components/core/Button.svelte';
	import MdiExchange from '~icons/mdi/exchange';
	import MaterialSymbolsClose from '~icons/material-symbols/close';
	import MaterialSymbolsLightExpand from '~icons/material-symbols-light/expand';
	import AppIconButton from '$lib/components/core/AppIconButton.svelte';

	export let data;
	let blogs = data.props.blogs;

	let isMenuOpen = false;
</script>

<svelte:head>
	<title>{'Docs - Flogram'}</title>
</svelte:head>
<div class='w-screen min-h-screen flex flex-col dark:bg-[#040d18]'>
	<div class='w-full flex flex-wrap justify-between px-6 py-4 dark:bg-[#171f31] gap-3'>
		<button on:click={() => goto('/docs')}>
			<h1
				class='text-2xl cursor-pointer dark:text-gray-200 self-center font-nunito font-semibold mb-2 md:mb-0'
			>
				Flogram Docs
			</h1>
		</button>
		<Button
			colorScheme='teal'
			className='hidden md:flex'
			leftIcon={MdiExchange}
			handleClick={() => goto('/tutorials')}>Switch to Tutorials
		</Button>

		<div class='md:hidden'>
			<AppIconButton icon={MdiExchange} rounded={false} handleClick={() => goto('/#sponsor')} />
		</div>

		<input
			type='text'
			class='border-2 border-black px-4 py-2 focus:outline-none text-lg w-full md:w-1/5'
			placeholder='Search docs'
		/>
	</div>
	<div class='w-full grid grid-cols-1 md:grid-cols-12 dark:bg-[#040d18]'>
		<div class='col-span-1 md:col-span-3 py-2 md:py-6'>
			<div
				class={`w-full flex ${
					!isMenuOpen ? 'flex-row md:flex-col gap-3 md:gap-0' : 'flex-col gap-0'
				}  px-3 text-lg dark:text-gray-200 font-nunito`}
			>
				{#each blogs as { path, metadata }}
					<div
						class={` ${
							$page.routeId?.split('/')[1] != path.split('/')[4] && !isMenuOpen && 'hidden md:flex'
						} ${
							$page.routeId?.split('/')[1] == path.split('/')[4] && 'dark:bg-slate-700 bg-gray-100'
						} py-2 w-full`}
					>
						<a
							href={`/docs/${path.split('/')[4].replace('.md', '').replace('.svx', '')}`}
							class={`px-3 py-1 cursor-pointer hover:text-gray-600`}>{metadata.title}</a
						>
					</div>
				{/each}


				<div class='md:hidden'>
					{#if isMenuOpen}
						<AppIconButton icon={MaterialSymbolsClose} handleClick={() => (isMenuOpen = !isMenuOpen)} />
					{:else}
						<AppIconButton icon={MaterialSymbolsLightExpand} handleClick={() => (isMenuOpen = !isMenuOpen)} />
					{/if}
				</div>
			</div>
		</div>
		<div class='col-span-1 md:col-span-9 px-6 pb-3'>
			<slot />
		</div>
	</div>
</div>

<style>
</style>
