import { page } from '$app/stores';
import aiIDEStore from '$lib/store/aiIDE';
import themeStore from '$lib/store/theme';
import { PUBLIC_DISCORD_INVITE, PUBLIC_GITHUB_REPO } from '$lib/constants';
import { is_dir } from '$lib/file_system';
import { editor_config } from '$lib/store/editor_config_store';
import { layout_store } from '$lib/store/layout_store';
import { current_tab, open_file } from '$lib/tabs';
import { error } from '$lib/toast';
import type { Command } from '$lib/types';
import { files, webcontainer } from '$lib/webcontainer';
import type { FileSystemTree } from '@webcontainer/api';
import { toast } from 'svelte-french-toast';
import type { SvelteComponent } from 'svelte';
import { derived, get, } from 'svelte/store';
import type { Readable } from 'svelte/store';
import { file_status } from '$lib/store/repl_id_store';
import Download from '~icons/material-symbols/download-rounded';
import Sorting from '~icons/material-symbols/drive-folder-upload-outline-rounded';
import FileBrowser from '~icons/material-symbols/menu-rounded';
import Themes from '~icons/material-symbols/routine';
import Terminal from '~icons/material-symbols/terminal-rounded';
import WrapText from '~icons/material-symbols/wrap-text-rounded';
import Discord from '~icons/mdi/discord';
import GitHub from '~icons/mdi/github';
import IonPlaySharp from '~icons/ion/play-sharp';
import MdiSparkles from '~icons/mdi/sparkles';
import MaterialSymbolsHelp from '~icons/material-symbols/help';
import SearchDocs from './commands_components/SearchDocs.svelte';
import FlogramSearch from '../components/FlogramSearch.svelte';
import IconParkOutlineText from '~icons/icon-park-outline/text';
import MaterialSymbolsSave from '~icons/material-symbols/save';

function get_files_from_tree(tree: FileSystemTree, path = './') {
	const files = [] as { file: string; path: string }[];
	for (const file_or_dir in tree) {
		const current_file = tree[file_or_dir];
		const current_path = `${path}${file_or_dir}`;
		if (is_dir(current_file)) {
			files.push(...get_files_from_tree(current_file.directory, `${current_path}/`));
			continue;
		}
		files.push({ file: file_or_dir, path: current_path });
	}
	return files;
}

function run_callbacks(kind: KnownCommands) {
	commands_callbacks.get(kind)?.forEach((callback) => {
		if (typeof callback === 'function') callback();
	});
}

async function prettier_action() {
	const $current_tab = get(current_tab);

	toast.success(`Formatting ${$current_tab}...`);
	// const progress_toast = toast.push(`Formatting ${$current_tab}...`, {
	// 	initial: 0,
	// 	dismissable: false,
	// });
	const process = await webcontainer.spawn(`prettier`, ['--write', $current_tab]);
	const code = await process.exit;
	// toast.pop(progress_toast);

	if (code === 0) {
		run_callbacks('format-current');
	} else {
		error('Something went wrong prettyifing this file!');
	}
}

async function run_current_tab() {
	aiIDEStore.runCurrentCode();
}

const generate_code = async (): Promise<void> => {
	await aiIDEStore.generateCode();
};

type KnownCommands = 'fork' | 'save' | 'format-current';

type AutocompletableString = KnownCommands | Omit<string, KnownCommands>;

const commands_callbacks = new Map<AutocompletableString, Set<() => void>>();

export function on_command(command: AutocompletableString, callback: () => void) {
	if (!commands_callbacks.has(command)) {
		commands_callbacks.set(command, new Set());
	}
	commands_callbacks.get(command)?.add(callback);
	return () => {
		commands_callbacks.get(command)?.delete(callback);
	};
}

export const commands: Readable<Command[]> = derived([files, page], ([$files, $page]) => {
	// ADD OPENING FILES TO COMMANDS
	const files = get_files_from_tree($files);
	const commands_to_return: Command[] = files.map((file) => ({
		category: 'File',
		title: `${file.file}`,
		subtitle: file.path,
		action() {
			open_file(file.path);
		}
	}));

	/**
	 * Wrapper function to get proper autocomplete on the props of the components
	 * @param command The command to push
	 */
	function push<T extends SvelteComponent>(command: Command<T>) {
		commands_to_return.push(command);
	}

	push({
		category: 'Flogram',
		command: 'search-flogram-docs',
		title: 'Search Flogram docs',
		subtitle: 'search Flogram documentation',
		icon: FlogramSearch,
		action_component: SearchDocs,
		action_component_props: {
			where: 'Flogram'
		},
		key_bind: {
			mod: ['$mod', 'Alt'],
			keys: ['KeyD']
		}
	});
	push({
		category: 'Flogram',
		command: 'open-flogram-github',
		title: 'Open GitHub',
		subtitle: 'open Flogram GitHub Repo',
		icon: GitHub,
		action() {
			window.open(`${PUBLIC_GITHUB_REPO}`, '_blank');
		}
	});

	push({
		category: 'Flogram',
		command: 'join-discord',
		title: 'Join Discord',
		subtitle: 'Join our Discord server',
		icon: Discord,
		action() {
			window.open(PUBLIC_DISCORD_INVITE, '_blank');
		}
	});


	push({
		category: 'Flogram',
		command: 'help',
		title: 'Help',
		subtitle: 'Flogram IDE Help',
		icon: MaterialSymbolsHelp,
		action() {
			editor_config.open_help();
		}
	});

	push({
		category: 'Preferences',
		command: 'toggle-file-tree',
		title: 'Toggle File Tree (Ctrl+B)',
		subtitle: 'toggle if file tree is shown',
		icon: FileBrowser,
		action() {
			layout_store.toggle_file_tree();
		},
		key_bind: {
			mod: ['$mod'],
			keys: ['KeyB']
		}
	});

	push({
		category: 'Preferences',
		command: 'toggle-english-description',
		title: 'Toggle Text Input (Alt+T)',
		subtitle: 'toggle if Text Input is shown',
		icon: IconParkOutlineText,
		action() {
			layout_store.toggle_description();
		},
		key_bind: {
			mod: ['Alt'],
			keys: ['KeyT']
		}
	});

	push({
		category: 'Preferences',
		command: 'toggle-terminal',
		title: 'Toggle Terminal (Ctrl+`)',
		subtitle: 'toggle if terminal is shown',
		icon: Terminal,
		action() {
			layout_store.toggle_terminal();
		},
		key_bind: {
			mod: ['$mod'],
			keys: ['`']
		}
	});

	push({
		category: 'Preferences',
		command: 'line-wrap-code-editor',
		title: 'Wrap Code',
		subtitle: 'toggle line wrap for code editor',
		icon: WrapText,
		action: editor_config.toggle_code_wrap
	});

	push({
		category: 'Preferences',
		command: 'switch-theme',
		title: 'Switch Theme',
		subtitle: 'toggle light or dark theme',
		icon: Themes,
		action() {
			themeStore.toggleMode();
		}
	});

	push({
		category: 'Preferences',
		command: 'toggle-sort',
		title: 'Toggle Folder / File Sort Order',
		subtitle: 'toggle if files or folders show up first',
		icon: Sorting,
		action() {
			layout_store.toggle_sort();
		}
	});

	push({
		category: 'Project',
		command: 'export-download-zip',
		title: 'Download',
		subtitle: 'download current project as .zip',
		icon: Download,
		async action() {
			toast.success(`Zipping up the filesystem...`);
			// const progress_toast = toast.push(`Zipping up the filesystem...`, {
			// 	initial: 0,
			// 	dismissable: false,
			// });
			await webcontainer.save_as_zip();

		}
	});

	push({
		category: 'Project',
		command: 'run-current-tab',
		title: 'Run Code',
		subtitle: 'Run Current Code',
		icon: IonPlaySharp,
		async action() {
			await run_current_tab();
		},
		key_bind: {
			mod: ['$mod'],
			keys: ['KeyR']
		}
	});

	push({
		category: 'Project',
		command: 'generate-code',
		title: 'Generate Code',
		subtitle: 'Generate Code from Text',
		icon: MdiSparkles,
		async action() {
			await generate_code();
		},
		key_bind: {
			mod: ['$mod'],
			keys: ['Digit1']
		}
	});


	push({
		category: 'Project',
		command: 'save-project',
		title: 'Save Project',
		subtitle: 'Save Project',
		icon: MaterialSymbolsSave,
		async action() {
			await file_status.save_repl();
		},
		key_bind: {
			mod: ['$mod'],
			keys: ['S']
		}
	});
	return commands_to_return;
});
