import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
export type AIIDEState = {
	delete_path: string[];
};

const initialState: AIIDEState = {
	delete_path : [],
};

const createStore = () => {
	const { subscribe, update }: Writable<AIIDEState> = writable(initialState);

	/**
	 * @Store Actions
	 */

	const set_delete_path = (path: boolean) => update((data) => ({ ...data, delete_path : [...data.delete_path, path] }));

	return {
		subscribe,
		set_delete_path
	};
};

const file_updating_store = createStore();
export default file_updating_store;
