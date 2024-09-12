<script lang='ts'>
	import { createEventDispatcher, onMount } from 'svelte';
	import { REPOSITORY_FILE_LAYOUT } from '$lib/util/enums';
	import repositoryStore from '$lib/store/repository';
	import Grid from './Grid.svelte';
	import List from './List.svelte';
	import { File, Mule, SORTERS } from '../Struct.svelte';
	import Properties from '../Snippets/Properties.svelte';
	import FileManagerHeader from './FileManagerHeader.svelte';

	export let path: string[];
	export let mule: Mule;
	export let sorter: (f1: File, f2: File) => number;

	const dispatch = createEventDispatcher();

	$: toPaste = null;
	$: isCut = false;
	$: propForFile = null;

	const openItem = ({ detail }) => {

		const { item: { uuid, id } } = detail;

		const file = mule.items.find((i: File) => i.uuid == uuid);

		if (file.isDir) {

			let newPath = file.name;

			newPath = newPath.replace(/\/$/, '');

			let nuPath: string[] = path;

			if (nuPath === '../') {
				nuPath = nuPath.slice(0, nuPath.length - 1);
			} else {
				nuPath = [...nuPath, newPath];
			}

			dispatch('pathEvent', { path: nuPath, newDirectoryId: id });
		} else {
			dispatch('openItem', detail);
		}
	};

	function markToPaste(event) {
		toPaste = event.detail.file;
		isCut = event.detail.isCut;
	}

	function resort(_sorter: (f1: File, f2: File) => number): () => void {
		return function() {
			sorter = _sorter;
		};
	}

	function reload() {
		dispatch('reload', {});
	}

	function doOpenPropsModal(event) {
		propForFile = event.detail.file;
	}

	function doClosePropsModal(event) {
		propForFile = null;
		reload();
	}

	onMount(async () => {
		if (window) {
			resort(SORTERS.ABC)();
		}
	});

</script>

<div class='w-full flex flex-col'>

	<FileManagerHeader
		bind:path
		bind:mule
		bind:sorter
		bind:toPaste
		bind:isCut
		on:pathEvent
		{resort}
		{reload}
	/>

	{#if $repositoryStore.mode === REPOSITORY_FILE_LAYOUT.GRID}
		<Grid itemList={mule.items} on:openItem={openItem} on:openPropsModal={doOpenPropsModal} />
	{:else if $repositoryStore.mode === REPOSITORY_FILE_LAYOUT.LIST}
		<List itemList={mule.items} bind:sorter on:openItem={openItem} on:openPropsModal={doOpenPropsModal} />
	{/if}

	{#if propForFile != null}
		<Properties bind:item={propForFile} readOnly={$repositoryStore.config.readonly} on:toPaste={markToPaste}
								on:closePropsModal={doClosePropsModal} />
	{/if}
</div>
