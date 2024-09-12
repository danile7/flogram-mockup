<script lang="ts">
	import { onMount } from 'svelte';
	import { layout_store } from '$lib/store/layout_store';
	import { fitAddon } from '$lib/terminal';
	import MdiMinimize from '~icons/mdi/minimize';
	import aiIDEStore from '$lib/store/aiIDE';
	import TerminalErrorDisplayer from '$lib/components/pages/flogram-new-ide/TerminalErrorDisplayer.svelte';

	let div: HTMLDivElement;

	onMount(() => {
		setTimeout(() => {
			update_height();
		}, 300);
	});

	export const update_height = () => {
		fitAddon.fit();
	};

	$: {
		$layout_store.terminal;
		setTimeout(() => {
			update_height();
		}, 10);
	}

</script>

<div class="flex flex-col h-full bg-back-1-light dark:bg-back-1-dark">
	<div class="flex items-center px-2 py-1 justify-between">
		<div class="uppercase font-semibold">Terminal</div>
		<div class="flex">
			<button
				class="w-6 h-6 hidden mobile:flex justify-center items-center bg-black dark:bg-white bg-opacity-0 dark:bg-opacity-0 hover:bg-opacity-10 dark:hover:bg-opacity-10 transitiona-ll duration-200 rounded"
				on:click={layout_store.toggle_terminal}
				title="Minimize Terminal (Ctrl+`)"
			>
				<MdiMinimize class="font-lg" />
			</button>
		</div>
	</div>

	<div class="flex-grow relative">
		<div class="absolute w-full h-full">
			<div class="relative w-full h-full overflow-y-auto flex flex-col p-2">
				<div
					class={`flex-grow text-start p-3 light:text-gray-900 dark:text-gray-200 text-lg overflow-auto ${
						$aiIDEStore?.failures?.length > 0 ? 'bg-red-500 bg-opacity-5' : ''
					} `}
				>
					{#if $aiIDEStore?.failures?.length > 0}
						<TerminalErrorDisplayer failures={$aiIDEStore.failures} />
					{:else}
						{@html $aiIDEStore.compileOutput}
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
