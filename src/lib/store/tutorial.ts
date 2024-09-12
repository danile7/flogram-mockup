import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { Post } from '$lib/types/docs';


export const tutorial = writable('');
export const update = (value) => tutorial.set(value);


export type TutorialState = {
	loading: boolean,
	terminalOpened: boolean,
	codeValue: string,
	compileOutput: string,
	failures: any[],
	errors: any[],
};

const initialState: TutorialState = {
	loading: false,
	terminalOpened: false,
	codeValue: ``,
	compileOutput: ``,
	failures: [],
	errors: [],
};

const createTutorialStore = () => {

	const { subscribe, update }: Writable<TutorialState> = writable(initialState);

	/**
	 * @Store Actions
	 */

	const setLoading = (loading: boolean) => update(data => ({ ...data, loading }));

	const setTerminalOpen = (terminalOpened: boolean) => update(data => ({ ...data, terminalOpened }));

	const setCode = (codeValue: string) => update(data => ({ ...data, codeValue }));

	const setCompileOutput = (compileOutput: string) => update(data => ({ ...data, compileOutput }));

	const setFailures = (failures: any) => update(data => ({ ...data, failures }));

	const setErrors = (errors: any) => update(data => ({ ...data, errors }));

	/**
	 * @async actions
	 */

	return {
		subscribe,
		setLoading,
		setTerminalOpen,
		setCode,
		setCompileOutput,
		setFailures,
		setErrors
	};
};


const tutorialStore = createTutorialStore();
export default tutorialStore;