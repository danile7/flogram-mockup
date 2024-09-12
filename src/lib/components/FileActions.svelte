<script lang="ts">
	import { Pane, Splitpanes } from 'svelte-splitpanes';
	import { base_path } from '$lib/store/base_path_store';
	import FileTree from './file_tree/FileTree.svelte';
	// import RunScripts from './RunScripts.svelte';
	import MenuBar from '$lib/components/pages/flogram-new-ide/MenuBar.svelte';
	import { commands } from '$lib/command_runner/commands';
	import DropdownMenu from '$lib/components/DropdownMenu.svelte';
	import MenuItem from '$lib/components/MenuItem.svelte';
	import IconamoonArrowDown2Duotone from '~icons/iconamoon/arrow-down-2-duotone';
	import CodiconRefresh from '~icons/codicon/refresh';
	import MdiSearch from '~icons/mdi/search';
	import MdiMinimize from '~icons/mdi/minimize';
	import { layout_store } from '$lib/store/layout_store';
	import { command_runner } from '$lib/store/command_runner_store';
	import aiIDEStore from '$lib/store/aiIDE';
	import { AI_MODE } from '$lib/util/enums';

	export let min_size = 5;
	export let mobile = false;
	let menuOpen: boolean = false;
	type ModeType = 'FAST' | 'QUALITY';
</script>

<Splitpanes horizontal>
	<Pane minSize={min_size}>
		{#if mobile}
			<div class="flex gap-2 px-4 py-1 text-text-1-dark dark:text-text-1-light">
				<MenuBar commands={$commands} />
			</div>
		{/if}
		<div class="flex flex-col h-screen bg-back-1-light dark:bg-back-1-dark text-text-1-dark dark:text-text-1-light">
			<div class="font-bold text-primary flex items-center pl-6 py-3 whitespace-nowrap">
				FLOGRAM IDE
			</div>
			<div class="flex items-center gap-2 leading-none pl-6 py-2">
				<div class="whitespace-nowrap">AI Mode:</div>
				<div class=" flex gap-[8px] items-center">
					<button class="flex flex-col">
						<DropdownMenu bind:open={menuOpen}>
							<button
								on:click|stopPropagation={() => {
									menuOpen = true;
								}}
								slot="trigger"
								class="flex items-center gap-2 relative py-1"
							>
								<div>
									{#if $aiIDEStore.AIMode === AI_MODE.FAST}Fast{:else if $aiIDEStore.AIMode === AI_MODE.QUALITY}Quality{/if}
								</div>
								<div
									class="rounded-full w-[16px] h-[16px]"
									class:bg-[#66BB6A]={$aiIDEStore.AIMode === AI_MODE.FAST}
									class:bg-[#FFA800]={$aiIDEStore.AIMode === AI_MODE.QUALITY}
								></div>
								<IconamoonArrowDown2Duotone />
							</button>

							<MenuItem
								on:click={() => {
									aiIDEStore.changeAIMode(AI_MODE.FAST);
								}}
							>
								<div class="flex justify-between w-full">
									<div>Fast</div>
									<div class="rounded-full w-[16px] h-[16px] bg-[#66BB6A]"></div>
								</div>
							</MenuItem>

							<MenuItem
								on:click={() => {
									aiIDEStore.changeAIMode(AI_MODE.QUALITY);
								}}
							>
								<div class="flex justify-between w-full">
									<div>Quality</div>
									<div class="rounded-full w-[16px] h-[16px] bg-[#FFA800]"></div>
								</div>
							</MenuItem>
						</DropdownMenu>
					</button>
				</div>
			</div>
			<div class="flex justify-end px-4 py-1 gap-2">
				<button
					title="Search (Ctrl+P)"
					class="w-6 h-6 flex justify-center items-center transition-all duration-200 rounded p-1 bg-black dark:bg-white bg-opacity-0 dark:bg-opacity-0 hover:bg-opacity-10 dark:hover:bg-opacity-10"
					on:click={() => {
						command_runner.open(' ');
					}}
				>
					<MdiSearch />
				</button>

				<button
					class="w-6 h-6 hidden mobile:flex justify-center items-center transition-all duration-200 rounded p-1 bg-black dark:bg-white bg-opacity-0 dark:bg-opacity-0 hover:bg-opacity-10 dark:hover:bg-opacity-10"
					title="Minimize File Browser (Ctrl+B)"
					on:click={layout_store.toggle_file_tree}
				>
					<MdiMinimize />
				</button>
			</div>
			<FileTree base_path={$base_path} />
		</div>
	</Pane>
</Splitpanes>
