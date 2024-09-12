import type Library from '$lib/components/pages/web-ide/Library.svelte';

export type User = {
	userId: number;
	email: string;
	username: string;
	libraries: Library[];
};
