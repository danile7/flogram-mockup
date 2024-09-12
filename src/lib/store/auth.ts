import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import { isEmptyString } from '$lib/util';
import type Library from '$lib/components/pages/web-ide/Library.svelte';
import { setGlobalFetchHeaders } from '$lib/services/fetchAPI';
import { getUserByToken } from '$lib/services/auth.service';

interface User {
	userId: number;
	email: string;
	username: string;
	libraries: Library[];
}

interface AuthState {
	loggedIn: boolean;
	loading: boolean;
	user: User | null;
	authHeader: any | null;
	error: string | null;
}

const initialState: AuthState = {
	loggedIn: false,
	loading: false,
	user: null,
	authHeader: null,
	error: null
};

const createAuthStore = () => {
	const { subscribe, update }: Writable<AuthState> = writable(initialState);

	/**
	 * @Store Actions
	 */

	const setUser = (user: User | null) => update((state) => ({ ...state, user, loading: false }));

	const setAuthHeader = (authHeader: any | null) =>
		update((state) => ({ ...state, authHeader, loading: false }));

	const setLoading = (loading: boolean) => update((data) => ({ ...data, loading }));

	const setLoggedIn = (loggedIn) => update((data) => ({ ...data, loggedIn }));

	const setError = (error) => update((data) => ({ ...data, error }));

	const verify = async () => {
		setLoading(true);

		try {
			if (localStorage && localStorage.access_token && !isEmptyString(localStorage.access_token)) {
				let token = localStorage.access_token;

				const user = await getUserByToken(token);

				setGlobalFetchHeaders({ Authorization: `Bearer ${token}` });

				setUser(user as User);

				setLoggedIn(true);
			}
		} catch (error) {
			if (localStorage) {
				localStorage.removeItem('access_token');
			}
		} finally {
			setLoading(false);
		}
	};

	return {
		subscribe,
		setLoggedIn,
		setLoading,
		setUser,
		setAuthHeader,
		setError,
		verify
	};
};

const authStore = createAuthStore();

export default authStore;
