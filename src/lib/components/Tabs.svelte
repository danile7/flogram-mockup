<script lang='ts'>
	import { draggable, dropzone } from '$lib/dnd';
	import aiIDEStore from '$lib/store/aiIDE';
	import { get_file_icon } from '$lib/file_icons';
	import { close_all_tabs, close_file, current_tab, open_file, reorder_tabs, tabs } from '$lib/tabs';
	import Routes from '~icons/material-symbols/alt-route';
	import Close from '~icons/material-symbols/close-rounded';
	import Folder from '~icons/material-symbols/folder';
	import Lib from '~icons/material-symbols/local-library';
	import FileStatusIndicator from '$lib/components/FileStatusIndicator.svelte';
	import IcomoonFreeFilePlay from '~icons/icomoon-free/file-play';
	import MaterialSymbolsHelp from '~icons/material-symbols/help';
	import { editor_config } from '$lib/store/editor_config_store';
	import { SvelteComponent, onDestroy, type ComponentType } from 'svelte';


	const base_icons = {
		routes: Routes,
		lib: Lib
	} as Record<string, ComponentType<SvelteComponent>>;

	onDestroy(() => {
		//close the tabs when we unmount the component
		close_all_tabs();
	});

	const button_refs: Record<string, HTMLButtonElement> = {};

	$: $current_tab && button_refs[$current_tab]?.scrollIntoView();
</script>

<section class='grid w-full grid-cols-[1fr_max-content]'>
	<ul role='tablist' class='flex m-0 bg-back-1-light dark:bg-back-3-dark [list-style:none] overflow-x-auto'>
		{#each $tabs as path, i}
			{@const route_arr = path.split('/').slice(1)}
			{@const main_folder = route_arr.length > 2 ? route_arr[1] : null}
			{@const route =
				route_arr.length > 1
					? `/${(route_arr.slice(2, route_arr.length - 1) ?? []).join('/')}`
					: ''}
			{@const file_name = route_arr.at(-1)}
			<li
				role='tab'
				class:bg-back-4-light={!$editor_config.is_help_active && path === $current_tab  }
				class:dark:bg-back-5-dark={!$editor_config.is_help_active && path === $current_tab }
				class='p-[0.5em] flex items-center gap-2 relative'
				use:draggable={String(i)}
				use:dropzone={{
					on_dropzone(old_index) {
						reorder_tabs(Number(old_index), i);
					},
				}}
			>
				<button
					class='flex items-center gap-[0.5em] w-max'
					class:font-semibold={path === $current_tab}
					bind:this={button_refs[path]}
					on:click={() => {
						open_file(path);
					}}
					on:auxclick={() => {
						close_file(path);
					}}
				>
					<svelte:component this={get_file_icon(file_name || '')} />
					{file_name}
					{#if path === $current_tab}
						<div class='!font-normal'>(Code Output)</div>
					{/if}
					<FileStatusIndicator {path} />
					{#if route}
						<small class='opacity-50 flex items-center gap-2'>
							{#if main_folder}
								{@const main_icon = base_icons[main_folder]}
								{#if !main_icon}
									<Folder />
									{main_folder}
								{:else}
									<svelte:component this={main_icon} />
								{/if}
							{/if}
							{route}
						</small>
					{/if}
				</button>
				<button
					class='flex items-center gap-[0.5em] w-max'
					title='Close {file_name}'
					on:click={() => {
						close_file(path);
					}}
				>
					<Close />
				</button>
			</li>
		{/each}

		{#if $editor_config.is_open_help}
			<li
				role='tab'
				class:bg-back-4-light={ $editor_config.is_help_active}
				class:dark:bg-back-5-dark={$editor_config.is_help_active}
				class:font-bold = {$editor_config.is_help_active}
				class:opacity-100 = {$editor_config.is_help_active}
				class='p-[0.5em] flex items-center gap-2 relative dark:text-text-1-light text-text-1-dark text-[1.2em] opacity-80'
			>
				<button
					class='flex items-center gap-[0.5em] w-max'
					on:click={() => editor_config.select_help_tab()}
				>
					<small class='flex items-center gap-2'>
						<MaterialSymbolsHelp />
						Help
					</small>
				</button>
				<button
					class='flex items-center gap-[0.5em] w-max'
					title='Close'
					on:click={() => editor_config.close_help()}
				>
					<Close />
				</button>
			</li>
		{/if}
	</ul>

	<button
		title='Run Current File (Ctrl+R)'
		on:click={()=> aiIDEStore.runCurrentCode()}
		class:hidden={$tabs.length === 0}
		class='flex justify-center items-center px-4 hover:text-primary transition-all duration-300 cursor-pointer'>
		<IcomoonFreeFilePlay />
	</button>
</section>

<style>

    :global(.dark li.droppable) {
        background: rgb(72, 72, 72);
    }

    :global(li.droppable) {
        background: rgb(196, 196, 196);
    }

    li:global(.droppable) * {
        pointer-events: none;
    }
</style>
