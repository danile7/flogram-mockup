<script lang='ts'>
	import { createEventDispatcher, getContext } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { DROPDOWN_CONTEXT } from './DropdownMenu.svelte';

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface $$Props extends HTMLButtonAttributes {
		href?: string;
	}

	export let href: string | undefined = undefined;

	const dispatch = createEventDispatcher();
	const { close_menu } = getContext<{ close_menu: () => void }>(DROPDOWN_CONTEXT);

	function handle_click(e: MouseEvent) {
		close_menu();
		dispatch('click', e);
	}
</script>

<button role='menuitem'
				class='[list-style:none] bg-back-2-light dark:bg-back-2-dark hover:bg-back-4-light dark:hover:bg-back-1-dark '
				on:click={handle_click}>
	<svelte:element
		this={href ? 'a' : 'button'}
		{href}
		role='listitem'
		class='flex items-center whitespace-nowrap !font-normal w-full px-4 py-2 gap-4 bg-back-1'
		{...$$restProps}
	>
		<slot />
	</svelte:element>
</button>