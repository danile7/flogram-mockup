<script lang='ts'>
	import { createEventDispatcher } from 'svelte';
	import GridCell from './GridCell.svelte';
	import type { File } from '../Struct.svelte';

	export let itemList: File[];

	const dispatch = createEventDispatcher();

</script>

<div class='flex flex-wrap gap-2'>
	{#each itemList as item, i (item.uuid)}
		<GridCell {item} on:openItem on:openPropsModal />
	{/each}
</div>
