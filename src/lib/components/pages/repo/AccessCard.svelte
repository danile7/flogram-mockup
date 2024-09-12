<script lang='ts'>
	export let title = '';
	export let description = '';
	export let isCheck = false;
	export let handleClick: any;
	export let icon: typeof import('svelte').SvelteComponent;

	import MaterialSymbolsCheck from '~icons/material-symbols/check';
</script>

<button
	class=" {isCheck
		? 'dark:bg-slate-700 bg-orange-100/50'
		: 'hover:dark:bg-slate-700 bg-transparent'} relative flex items-center gap-5 hover:dark:bg-slate-700 hover:bg-orange-100/50 py-3 px-4 cursor-pointer rounded-md transition"
	on:click={() => handleClick()}
>
	<svelte:component this={icon} class='' />
	<div class='flex flex-col gap-2 items-start'>
		<span>{title}</span>
		<span>{description}</span>
	</div>

	<!-- check mark -->
	{#if isCheck}
		<MaterialSymbolsCheck class='absolute top-4 right-4' />
	{/if}
</button>
