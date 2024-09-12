import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import { REPOSITORY_FILE_LAYOUT } from '../util/enums';

export type LayoutMode = 'GRID' | 'LIST'

interface ConfigType {
	readonly: boolean;
}

export type RepositoryState = {
	mode: LayoutMode,
	config: ConfigType,
};

const initialState: RepositoryState = {
	mode: REPOSITORY_FILE_LAYOUT.LIST,
	config: {
		readonly: false
	}
};

const createRepositoryStore = () => {

	const { subscribe, update }: Writable<RepositoryState> = writable(initialState);

	/**
	 * @Store Actions
	 */
	const setRepoName = (name: string) => update(data => ({ ...data, name }));

	const setLayoutMode = (mode: LayoutMode) => update(data => ({ ...data, mode }));

	const setConfig = (config: ConfigType) => update(data => ({ ...data, config }));

	const toggleLayoutMode = () => {
		update(data => {
			const newMode = data.mode === REPOSITORY_FILE_LAYOUT.GRID ? REPOSITORY_FILE_LAYOUT.LIST : REPOSITORY_FILE_LAYOUT.GRID;
			return { ...data, mode: newMode };
		});
	};

	const setPath = (path) => update(data => ({ ...data, path }));

	/**
	 * @async actions
	 */

	return {
		subscribe,
		setRepoName,
		setLayoutMode,
		toggleLayoutMode,
		setPath
	};

};

const repositoryStore = createRepositoryStore();
export default repositoryStore;