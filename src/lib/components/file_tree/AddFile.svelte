<script lang="ts">
	import { get_folder_icon, get_file_icon } from '$lib/file_icons';
	import { createEventDispatcher } from 'svelte';
	import Close from '~icons/material-symbols/close';
	import Check from '~icons/material-symbols/done';

	export let type: 'folder' | 'file';
	export let name = '';
	export let expanded = false;

	const dispatch = createEventDispatcher();
</script>

<form
	on:submit={(e) => {
		e.preventDefault();
		if (!name) return;
		dispatch('add', name.toString());
	}}
	class="w-full flex items-center gap-2 pr-2"	
>
	<svelte:component
	class="min-w-[1.3em] "
		this={type === 'folder' ? get_folder_icon(name, expanded) : get_file_icon(name)}
	/>
	<!-- svelte-ignore a11y-autofocus -->
	<input bind:value={name} autofocus class="min-w-5 flex-grow border-b border-primary  focus:border-opacity-100 bg-transparent whitespace-nowrap overflow-ellipsis transition-all duration-200"/>

	<button title="Create file">
		<Check />
	</button>

	<button
		title="Cancel"
		type="button"
		on:click={() => {
			dispatch('cancel');
		}}
	>
		<Close />
	</button>
</form>

<style src="./style.css"></style>
