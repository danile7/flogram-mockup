import { persisted } from 'svelte-local-storage-store';

interface LayoutStore {
	file_tree: number;
	terminal: number;
	show_config: boolean;
	folders_first: boolean;
	description : number;
}

const { subscribe, update, set } = persisted<LayoutStore>('layout_preferences', {
	file_tree: 15,
	terminal: 30,
	show_config: true,
	folders_first: true,
	description :60,
});

function toggle_state(key: keyof LayoutStore) {
	update((state) => ({
		...state,
		[key]: !state[key],
	}));
}

type LayoutKeysByType<T> = keyof {
	[Key in keyof LayoutStore as LayoutStore[Key] extends T ? Key : never]: LayoutStore[Key];
};

function toggle_number(key: LayoutKeysByType<number>, size : number) {
	update((state) => ({
		...state,
		[key]: state[key] === 0 ? size : 0,
	}));
}

const toggle_file_tree = () => toggle_number('file_tree', 15);
const toggle_terminal = () => toggle_number('terminal', 30);
const toggle_config = () => toggle_state('show_config');
const toggle_sort = () => toggle_state('folders_first');
const toggle_description = () => toggle_number('description', 40);

export const layout_store = {
	subscribe,
	set, // used by <Pane bind:size> inside Desktop.svelte
	toggle_file_tree,
	toggle_terminal,
	toggle_config,
	toggle_sort,
	toggle_description
};
