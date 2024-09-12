<script lang='ts'>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { get_theme } from '$lib/theme';
	import { file_status } from '$lib/store/repl_id_store'
	import authStore from '$lib/store/auth';
	import { layout_store } from '$lib/store/layout_store';
	import { command_runner } from '$lib/store/command_runner_store';
	import { editor_config } from '$lib/store/editor_config_store';
	import { is_repl_saving, is_repl_to_save } from '$lib/store/repl_id_store';
	import { commands, on_command } from '$lib/command_runner/commands';
	import IonPlaySharp from '~icons/ion/play-sharp';
	import FlogramSearch from '~icons/r-icons/flogram-search.svg';
	import Cmd from '~icons/material-symbols/keyboard-command-key';
	import IconParkOutlineText from '~icons/icon-park-outline/text';
	import Terminal from '~icons/material-symbols/terminal-rounded';
	import FileBrowser from '~icons/material-symbols/menu-rounded';
	import MaterialSymbolsHelp from '~icons/material-symbols/help';
	import MaterialSymbolsSave from '~icons/material-symbols/save';
	import MaterialSymbolsCreateNewFolder from '~icons/material-symbols/create-new-folder';
	import MaterialSymbolsFolder from '~icons/material-symbols/folder';
	import MenuBar from './MenuBar.svelte';
	import AsyncButton from '$lib/components/core/AsyncButton.svelte';

	export let mobile: boolean = false;

	const theme = get_theme();

	let forking = false;

	onMount(() => {
		return on_command('fork', async () => {
			forking = true;
			await file_status.save_repl(true);
			forking = false;
		});
	});
</script>

<header
	class='px-4 py-1 flex justify-between gap-2 bg-back-2-light dark:bg-back-5-dark relative z-2 items-center'
>
	<div class='hidden mobile:flex gap-4'>
		<MenuBar commands={$commands} />
	</div>

	<div class='hidden tablet:flex'>
		<div class='flex justify-center items-center m-auto max-w-[30rem]'>
			<button
				title='Search Flogram documentation'
				class='px-10 text-md text-text-2-dark dark:text-text-2-light border border-black dark:border-white border-opacity-40 dark:border-opacity-40 rounded-full shadow-md w-full flex justify-center items-center opacity-80 gap-2 relative transition-all duration-200 dark:hover:border-primary dark:hover:text-primary hover:border-primary hover:text-primary'
				on:click={() => {
					command_runner.open('search-flogram-docs');
				}}
			>
				<div style='transform: translate(0, 2px) scale(0.8)'>
					<FlogramSearch class='' />
				</div>
				<span class='whitespace-nowrap'>Flogram docs...</span>
			</button>
		</div>
	</div>

	<div class=' flex items-center gap-8 [& button]:border '>
		<div class='flex h-full items-center gap-8'>
			<button class='relative hover:text-primary transition-all duration-200' title='Run Project (Ctrl+Shift+R)'>
				<IonPlaySharp />
			</button>

			<button
				class='hidden mobile:flex relative hover:text-primary transition-all duration-200'
				class:text-primary={$layout_store.description !== 0}
				title='Toggle Text Input (Alt+T)'
				on:click={layout_store.toggle_description}
			>
				<IconParkOutlineText />
			</button>

			<button
				class='hidden mobile:flex relative hover:text-primary transition-all duration-200'
				class:text-primary={$layout_store.terminal !== 0}
				title='Toggle Terminal (Ctrl+`)'
				on:click={layout_store.toggle_terminal}
			>
				<Terminal />
			</button>

			<button
				class='hidden mobile:flex relative hover:text-primary transition-all duration-200'
				class:text-primary={$layout_store.file_tree!== 0}
				title='Toggle File Browser (Ctrl+B)'
				on:click={layout_store.toggle_file_tree}
			>
				<FileBrowser />
			</button>

			<button
				class='hidden mobile:flex relative hover:text-primary transition-all duration-200'
				class:text-primary={$editor_config.is_open_help}
				title='Help'
				on:click={() => editor_config.open_help()}
			>
				<MaterialSymbolsHelp />
			</button>
		</div>

		{#if $authStore.user}
			<button
				class='hover:text-primary transition-all duration-200'
				on:click={() => {
					command_runner.open('> ');
				}}
				title='Open Command Runner (CTRL+K)'
			>
				<Cmd />
			</button>

			<button
				class='hidden mobile:flex relative hover:text-primary transition-all duration-200'
				title='Projects'
				on:click={() => goto('/flogram-ide/repositories')}
			>
				<MaterialSymbolsFolder />
			</button>

			<button
				class='hidden mobile:flex relative hover:text-primary transition-all duration-200'
				title='Create a new Project'
				on:click={() => goto('/flogram-ide/create')}
			>
				<MaterialSymbolsCreateNewFolder />
			</button>

			<AsyncButton
				badged={$is_repl_to_save}
				click={async () => {
						await file_status.save_repl();
					}}
				title='Save Changes (Ctrl+S)'
				loading={$is_repl_saving}
			>
				<MaterialSymbolsSave />
			</AsyncButton>
		{/if}
	</div>
</header>