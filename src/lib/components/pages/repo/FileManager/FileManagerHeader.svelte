<script lang='ts'>
	import { createEventDispatcher, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Swal from 'sweetalert2';
	import Breadcrumb from '../Snippets/Breadcrumb.svelte';
	import { SORTERS } from '../Struct.svelte';
	import IconSortAlphAsc from '../SVG/IconSortAlphAsc.svelte';
	import IconSortAlphDesc from '../SVG/IconSortAlphDesc.svelte';
	import IconSortDateAsc from '../SVG/IconSortDateAsc.svelte';
	import IconSortDateDesc from '../SVG/IconSortDateDesc.svelte';
	import IconSortSizeAsc from '../SVG/IconSortSizeAsc.svelte';
	import IconSortSizeDesc from '../SVG/IconSortSizeDesc.svelte';
	import IconPaste from '../SVG/IconPaste.svelte';
	import IconUnpaste from '../SVG/IconUnpaste.svelte';
	import { REPOSITORY_FILE_LAYOUT } from '$lib/util/enums';
	import repositoryStore from '$lib/store/repository';
	import AppMenu from '$lib/components/core/AppMenu.svelte';
	import { setCookie, getCookie } from '$lib/util';
	import IconamoonFolderAddFill from '~icons/iconamoon/folder-add-fill';
	import IcSharpBackup from '~icons/ic/sharp-backup';
	import MaterialSymbolsList from '~icons/material-symbols/list';
	import FlowbiteGridSolid from '~icons/flowbite/grid-solid';

	const dispatch = createEventDispatcher();

	export let path;
	export let mule;
	export let toPaste;
	export let sorter;
	export let resort;
	export let reload;
	export let isCut;

	const layoutViewId = 'repository_view_mode';

	function unmarkToPaste() {
		toPaste = null;
		isCut = false;
	}

	async function doPaste() {
		await Swal.fire({
			icon: 'warning',
			text: 'Not implemented in the demo site',
			confirmButtonColor: '#0a6bb8'
		});
		unmarkToPaste();
	}

	async function newFolder() {
		const { value: name } = await Swal.fire({
			titleText: 'Enter folder name',
			confirmButtonColor: '#0a6bb8',
			showCancelButton: true,
			input: 'text',
			inputAttributes: {
				autocapitalize: 'off',
				autocorrect: 'off'
			}
		});

		if (!name) {
			return;
		}

		await Swal.fire({
			icon: 'warning',
			text: 'Not implemented in the demo site',
			confirmButtonColor: '#0a6bb8'
		});
	}

	async function doUpload() {
		const { value: file } = await Swal.fire({
			titleText: 'Select files',
			confirmButtonColor: '#0a6bb8',
			showCancelButton: true,
			input: 'file'
		});

		if (!file) return;

		await Swal.fire({
			icon: 'warning',
			text: '',
			confirmButtonColor: '#0a6bb8'
		});
	}

	let sortMenuOpen = false;

	const closeSortMenu = () => sortMenuOpen = false;

	const handleSort = order => {
		resort(order)();
		sortMenuOpen = false;
	};


	const toggleMode = () => {

		let cookieSubscribed = getCookie('COOKIE_SUBSCRIBED') === 'true';

		if(cookieSubscribed){
			setCookie(layoutViewId, $repositoryStore.mode === REPOSITORY_FILE_LAYOUT.GRID ? REPOSITORY_FILE_LAYOUT.LIST : REPOSITORY_FILE_LAYOUT.GRID);
		}

		repositoryStore.toggleLayoutMode();
	};

	onMount(async () => {
		if (window) {
			resort(SORTERS.ABC)();
		}
	});

</script>

<nav class='flex relative items-center' style='height: 40px;'>

	<Breadcrumb bind:path bind:mule={mule} on:pathEvent />

	<div class='navbar-menu ml-auto flex items-center gap-2 [&>*]:h-full'>
		{#if !!toPaste}
			<button class='cursor-pointer' title='Paste' transition:fade on:click={doPaste}>
				<IconPaste color='#AA0000' size={24} />
			</button>
			<button class='cursor-pointer' title='Abort paste' transition:fade on:click={unmarkToPaste}>
				<IconUnpaste color='#AA0000' size={24} />
			</button>
		{/if}

		{#if !$repositoryStore.config.readonly}
			<button class='cursor-pointer text-xl' title='Create folder' on:click={newFolder}>
				<IconamoonFolderAddFill />
			</button>

			<button class='cursor-pointer text-xl' title='Upload file(s)' on:click={doUpload}>
				<IcSharpBackup />
			</button>
		{/if}

		<button class='cursor-pointer text-xl' title='View mode' on:click={() => toggleMode()}>
			{#if $repositoryStore.mode === REPOSITORY_FILE_LAYOUT.GRID}
				<FlowbiteGridSolid />
			{:else}
				<MaterialSymbolsList />
			{/if}
		</button>


		<!--		<AppMenu bind:open={sortMenuOpen}>-->
		<!--			<button slot='button'>-->
		<!--				{#if sorter === SORTERS.ABC}-->
		<!--					<IconSortAlphAsc size={24} />-->
		<!--				{:else if sorter === SORTERS.CBA}-->
		<!--					<IconSortAlphDesc size={24} />-->
		<!--				{:else if sorter === SORTERS.OldFirst}-->
		<!--					<IconSortDateAsc size={24} />-->
		<!--				{:else if sorter === SORTERS.OldLast}-->
		<!--					<IconSortDateDesc size={24} />-->
		<!--				{:else if sorter === SORTERS.SmallFirst}-->
		<!--					<IconSortSizeAsc size={24} />-->
		<!--				{:else if sorter === SORTERS.SmallLast}-->
		<!--					<IconSortSizeDesc size={24} />-->
		<!--				{/if}-->
		<!--			</button>-->

		<!--			<div slot='menu' class='flex flex-col rounded-md bg-white border border-black border-opacity-10'>-->
		<!--				<button-->
		<!--					class='p-2 transition-all duration-200 bg-black bg-opacity-0 hover:bg-opacity-10 rounded-tl-md rounded-tr-md '-->
		<!--					class:active={sorter === SORTERS.ABC}-->
		<!--					on:click={() => handleSort(SORTERS.ABC)}-->
		<!--					title='Sort alphabetically, ascending'>-->
		<!--					<IconSortAlphAsc size={24} />-->
		<!--				</button>-->
		<!--				<button-->
		<!--					class='p-2 transition-all duration-200 bg-black bg-opacity-0 hover:bg-opacity-10'-->
		<!--					class:active={sorter === SORTERS.CBA}-->
		<!--					on:click={() => handleSort(SORTERS.CBA)}-->
		<!--					title='Sort alphabetically, descending'>-->
		<!--					<IconSortAlphDesc size={24} />-->
		<!--				</button>-->
		<!--				<button-->
		<!--					class='p-2 transition-all duration-200 bg-black bg-opacity-0 hover:bg-opacity-10'-->
		<!--					class:active={sorter === SORTERS.OldFirst}-->
		<!--					on:click={() => handleSort(SORTERS.OldFirst)}-->
		<!--					title='Sort by date, ascending'>-->
		<!--					<IconSortDateAsc size={24} />-->
		<!--				</button>-->
		<!--				<button-->
		<!--					class='p-2 transition-all duration-200 bg-black bg-opacity-0 hover:bg-opacity-10'-->
		<!--					class:active={sorter === SORTERS.OldLast}-->
		<!--					on:click={() => handleSort(SORTERS.OldLast)}-->
		<!--					title='Sort by date, descending'>-->
		<!--					<IconSortDateDesc size={24} />-->
		<!--				</button>-->
		<!--				<button-->
		<!--					class='p-2 transition-all duration-200 bg-black bg-opacity-0 hover:bg-opacity-10'-->
		<!--					class:active={sorter === SORTERS.SmallFirst}-->
		<!--					on:click={() => handleSort(SORTERS.SmallFirst)}-->
		<!--					title='Sort by size, ascending'>-->
		<!--					<IconSortSizeAsc size={24} />-->
		<!--				</button>-->
		<!--				<button-->
		<!--					class='p-2 transition-all duration-200 bg-black bg-opacity-0 hover:bg-opacity-10 rounded-ml-md rounded-mr-md'-->
		<!--					class:active={sorter === SORTERS.SmallLast} title='Sort by size, descending'-->
		<!--					on:click={() => handleSort(SORTERS.SmallLast)}-->
		<!--				>-->
		<!--					<IconSortSizeDesc size={24} />-->
		<!--				</button>-->

		<!--			</div>-->
		<!--		</AppMenu>-->

	</div>
</nav>