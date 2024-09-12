<script lang='ts'>
	import type { File } from '../Struct.svelte';
	import { createEventDispatcher } from 'svelte';
	import { REPOSITORY_FILE_ICON } from '$lib/util/enums';
	import { Icon } from '@smui/button';

	export let item: File;
	let name = '';
	let icon = [];
	let size = 0;

	$:{
		let { name: itemName, icon: itemIcon, size: itemSize } = item;

		name = itemName;
		icon = itemIcon;
		size = itemSize;

		name = name.replace('/', '');
	}

	const dispatch = createEventDispatcher();
</script>

<button
	on:click|stopPropagation={dispatch('openItem', {item})}
	class='flex flex-col w-[156px] min-w-[156px] justify-between overflow-hidden rounded-sm shadow-md hover:shadow-lg rounded-lg cursor-pointer select-none	p-3 dark:bg-gray-800 bg-white min-h-[148px]  border border-blue-500 border-opacity-0 hover:border-opacity-100 transition-all duration-300'>

	<Icon class='material-icons text-7xl text-gray-600'>
		{REPOSITORY_FILE_ICON[icon[0]]}
	</Icon>

	<div class='w-full flex flex-col items-start relative pr-8'>
		<div
			class=' w-full truncate overflow-hidden whitespace-nowrap font-semibold text-md pb-1 text-left'>{name}</div>
		<span class=' text-sm text-gray-600'>{size}</span>

		<button
			class='absolute right-0 bottom-0 w-8 h-8 rounded-full hover:bg-black hover:bg-opacity-5 transition-all duration-200 flex justify-center items-center'
			on:click|stopPropagation={()=>dispatch('openPropsModal', { file: item })}>
			⁝
		</button>
	</div>

</button>
