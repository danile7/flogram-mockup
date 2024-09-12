<script lang='ts'>
	import ListRow from './ListRow.svelte';
	import type { File } from '../Struct.svelte';
	import { SORTERS } from '../Struct.svelte';
	import AppTable from '../../../core/AppTable.svelte';
	import AppTableHeader from '../../../core/AppTableHeader.svelte';
	import AppTableCol from '../../../core/AppTableCol.svelte';

	export let itemList: File[];
	export let sorter: (f1: File, f2: File) => number;

	const CARET_DOWN = '<span class="monospace font-s1">️ᐁ&nbsp;</span>';
	const CARET_UP = '<span class="monospace font-s1">ᐃ&nbsp;</span>';
	const CARET_NO = '<span class="monospace font-s1">&nbsp;&nbsp;</span>';
	const CARETS = [CARET_UP, CARET_DOWN];
	const WHERES = { NAME: 'N', DATE: 'D', SIZE: 'S' };

	const SORTERS_DECODED: Map<(f1: File, f2: File) => number, [string, number]> = new Map<>();
	SORTERS_DECODED.set(SORTERS.ABC, [WHERES.NAME, 0]);
	SORTERS_DECODED.set(SORTERS.CBA, [WHERES.NAME, 1]);
	SORTERS_DECODED.set(SORTERS.OldFirst, [WHERES.DATE, 0]);
	SORTERS_DECODED.set(SORTERS.OldLast, [WHERES.DATE, 1]);
	SORTERS_DECODED.set(SORTERS.SmallFirst, [WHERES.SIZE, 0]);
	SORTERS_DECODED.set(SORTERS.SmallLast, [WHERES.SIZE, 1]);

	const SORTERS_BY_COORDS: Map<string, [(f1: File, f2: File) => number, (f1: File, f2: File) => number]> = new Map<>();
	SORTERS_BY_COORDS.set(WHERES.NAME, [SORTERS.ABC, SORTERS.CBA]);
	SORTERS_BY_COORDS.set(WHERES.DATE, [SORTERS.OldFirst, SORTERS.OldLast]);
	SORTERS_BY_COORDS.set(WHERES.SIZE, [SORTERS.SmallFirst, SORTERS.SmallLast]);

	let sortingWhere: string;
	let sortingHow: number;

	$: {
		[sortingWhere, sortingHow] = SORTERS_DECODED.get(sorter);
	}

	function getCaret(where: string) {
		if (sortingWhere != where)
			return CARET_NO;
		return CARETS[sortingHow];
	}

	function chSorter(where: string) {
		return function() {
			if (sortingWhere == where) {
				sortingHow = 1 - sortingHow;
			} else {
				sortingWhere = where;
				sortingHow = 0;
			}
			sorter = SORTERS_BY_COORDS.get(sortingWhere)[sortingHow];
		};
	}
</script>


<div class='bg-white dark:bg-gray-800 shadow-md rounded-lg'>
	<AppTable>
		<AppTableHeader class=''>
			<AppTableCol class='cursor-pointer select-none' col={6} on:click={chSorter(WHERES.NAME)}>
				Name {@html getCaret(WHERES.NAME, sorter)}
			</AppTableCol>

			<AppTableCol class='cursor-pointer select-none' col={2} on:click={chSorter(WHERES.SIZE)}>
				Size {@html getCaret(WHERES.SIZE, sorter)}
			</AppTableCol>

			<AppTableCol class='cursor-pointer select-none' col={2} on:click={chSorter(WHERES.DATE)}>
				<div class='hidden md:flex'>Date {@html getCaret(WHERES.DATE, sorter)}</div>
			</AppTableCol>

		</AppTableHeader>

		{#each itemList as item (item.uuid)}
			<ListRow {item} on:openItem on:openPropsModal />
		{/each}
	</AppTable>
</div>