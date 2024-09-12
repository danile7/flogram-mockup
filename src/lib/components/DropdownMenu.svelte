<script lang="ts" context="module">
	export const DROPDOWN_CONTEXT = Symbol();
</script>

<script lang="ts">
	import { click_outside } from '$lib/click_outside';
	import { computePosition, shift } from '@floating-ui/dom';
	import { setContext } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';
	import MoreVert from '~icons/material-symbols/more-vert';
	import FeDropDown from '~icons/fe/drop-down';

	export let open = false;
	export let indicator = false;

	const menu_id = uuidv4();
	const trigger_id = uuidv4();

	function close_menu() {
		open = false;
	}

	setContext(DROPDOWN_CONTEXT, { close_menu });

	let button: HTMLButtonElement;
	let tooltip: HTMLDivElement;

	$: open &&
		computePosition(button, tooltip, {
			placement: 'bottom-start',
			middleware: [shift()],
		}).then(({ x, y }) => {
			Object.assign(tooltip.style, {
				left: `${x}px`,
				top: `${y}px`,
			});
		});
</script>

<button
	bind:this={button}
	class = "flex items-center  justify-space-between gap-1 relatives font-bold bg-black bg-opacity-0 hover:bg-opacity-10 hover:shadow-md  dark:bg-white dark:bg-opacity-0 dark:hover:bg-opacity-10 px-1 rounded"
	class:indicator
	title="Open Menu"
	id={trigger_id}
	on:click={() => (open = !open)}
	aria-haspopup="true"
	aria-expanded={open}
	aria-controls={menu_id}
>
	<slot name="trigger">
		<MoreVert />
	</slot>
	{#if indicator}
		<FeDropDown className = "text-[2px]"/>
	{/if}
</button>
<section class = "contents" use:click_outside={{ enabled: open, func: close_menu }}>
	<div aria-hidden={!open} class:open class="absolute grid w-max grid-rows-[minmax(0,_var(--open,_0fr))] overflow-hidden [transition:grid-template-rows_250ms] rounded-tr-none min-w-[10rem] border-[1px] border-solid border-[transparent] z-[999] pointer-events-none rounded-bl-[0.5em] rounded-br-[0.5em]" bind:this={tooltip}>
		<ul class="m-0 flex flex-col" id={menu_id} role="menu" aria-labelledby={trigger_id}>
			<slot />
		</ul>
	</div>
</section>

<style>
	.open {
		--open: 1fr;
		pointer-events: auto !important;
		box-shadow: 0 0 1rem 0 rgb(0 0 0 / 0.2);
	}

</style>
