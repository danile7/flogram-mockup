import { persisted } from 'svelte-local-storage-store';

interface EditorConfigStore {
	vim: boolean;
	code_wrap: boolean;
	is_open_help: boolean;
	is_help_active: boolean;
}

const default_preferences = {
	delay_function: 'throttle' as 'throttle' | 'debounce',
	delay_duration: 300
};

export const editor_preferences = persisted('sk__editor_preferences', default_preferences);

export function set_default_editor_preferences() {
	editor_preferences.set({ ...default_preferences });
}

const { subscribe, update } = persisted<EditorConfigStore>('editor_config', {
	vim: false,
	code_wrap: false,
	is_open_help: true,
	is_help_active: false
});

function toggle_state(key: keyof EditorConfigStore) {
	update((state) => ({
		...state,
		[key]: !state[key]
	}));
}

const toggle_code_wrap = () => toggle_state('code_wrap');

const open_help = () => update(state => ({ ...state, is_open_help: true, is_help_active: true }));

const close_help = () => update(state => ({ ...state, is_open_help: false, is_help_active : false }));

const select_help_tab = () => update(state => ({ ...state, is_help_active: true }));

const unselect_help_tab = () => update(state => ({ ...state, is_help_active: false }));

export const editor_config = {
	subscribe,
	toggle_code_wrap,
	open_help,
	close_help,
	select_help_tab,
	unselect_help_tab
};
