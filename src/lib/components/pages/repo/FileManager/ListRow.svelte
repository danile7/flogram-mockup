<script lang='ts'>
	import { createEventDispatcher } from 'svelte';
	import type { File } from '../Struct.svelte';
	import AppTableRow from '$lib/components/core/AppTableRow.svelte';
	import AppTableCol from '$lib/components/core/AppTableCol.svelte';
	import { Icon } from '@smui/button';
	import { REPOSITORY_FILE_ICON } from '$lib/util/enums';

	export let item: File;
	let name = '';
	let size = 0;
	let chDate = '';
	let icon = [];

	$:{
		let { chDate: itemChData, isDir, name: itemName, size: itemSize, icon: itemIcon } = item;

		name = itemName;
		size = itemSize;
		chDate = itemChData;
		icon = itemIcon;

		if (isDir) {
			name = name.replace('/', '');
		}
	}

	const dispatch = createEventDispatcher();

	function click(item): (e: Event) => void {
		return (e: Event) => {
			dispatch('openItem', { item });
		};
	}

	function toProperties() {
		dispatch('openPropsModal', { file: item });
	}

</script>


<AppTableRow on:click={click(item)} class='transition-all duration-200 bg-black bg-opacity-0 hover:bg-opacity-10'>
	<AppTableCol col={6}>
		<div class='flex gap-2 items-center'>
			<Icon class='material-icons text-lg text-gray-600'>
				{REPOSITORY_FILE_ICON[icon[0]]}
			</Icon>
			<span class='truncate overflow-hidden whitespace-nowrap'>{icon[2]}{name}</span>
		</div>
	</AppTableCol>


	<AppTableCol col={2}>
		<td class='min-w-1/5 truncate overflow-hidden whitespace-nowrap'>{size}</td>
	</AppTableCol>

	<AppTableCol col={3} class=' truncate overflow-hidden whitespace-nowrap'>
		<div class='hidden md:flex'>{chDate}</div>
	</AppTableCol>

	<AppTableCol>
		<div class='flex justify-center items-center'>
			<button on:click|stopPropagation={toProperties} class='cursor-pointer menu'></button>
		</div>
	</AppTableCol>
</AppTableRow>