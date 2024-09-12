import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import { getCookie } from '../util';

type ModeType = 'dark' | 'light'

interface ThemeState {
	mode: ModeType;
	codeMirror: {
		light: any | null,
		dark: any | null
	};
}

const initialState: ThemeState = {
	mode: 'dark',
	codeMirror: {
		light: null,
		dark: null
	}
};

const createThemeStore = () => {
	const { subscribe, update }: Writable<ThemeState> = writable(initialState);

	/**
	 * @Store Actions
	 */

	const setMode = (mode: ModeType) => {
		update(state => ({ ...state, mode }));

		let cookieSubscribed = getCookie('COOKIE_SUBSCRIBED') === 'true';

		if (cookieSubscribed) {
			localStorage?.setItem('themeMode', mode);
		}

	};

	const toggleMode = () => {
		update(state => {

			let mode: ModeType = state.mode === 'dark' ? 'light' : 'dark';
			let cookieSubscribed = getCookie('COOKIE_SUBSCRIBED') === 'true';

			if (cookieSubscribed) {
				localStorage?.setItem('themeMode', mode);
			}
			return ({ ...state, mode });
		});
	};

	// initial set
	let themeMode = initialState.mode;

	if (typeof window !== 'undefined') {

		let cookieSubscribed = getCookie('COOKIE_SUBSCRIBED') === 'true';

		if (cookieSubscribed && localStorage.getItem('themeMode')) {
			themeMode = localStorage.getItem('themeMode') as ModeType;
		}

		setMode(themeMode);
	}

	const setCodeMirrorTheme = (codeMirrorTheme) => {
		update(state => ({ ...state, codeMirror: { ...codeMirrorTheme } }));
	};

	return {
		subscribe,
		setMode,
		toggleMode,
		setCodeMirrorTheme
	};
};

const themeStore = createThemeStore();

export default themeStore;